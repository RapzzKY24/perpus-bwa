<?php

namespace App\Http\Middleware;

use App\Models\RouteAccess;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response;

class DynamicRoleAndPermissionMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $route_name = Route::currentRouteName();

        $routeAccesses = RouteAccess::where('route_name', $route_name)->get();

        if ($routeAccesses->isNotEmpty()) {
            $isAuthorized = false;

            foreach ($routeAccesses as $routeAccess) {
                $role = $routeAccess->role_id ? Role::find($routeAccess->role_id) : null;
                $permission = $routeAccess->permission_id ? Permission::find($routeAccess->permission_id) : null;

                if (
                    ($role && auth()->user()->hasRole($role->name)) ||
                    ($permission && auth()->user()->can($permission->name))
                ) {
                    $isAuthorized = true;
                    break;
                }
            }

            if ($isAuthorized) {
                return $next($request);
            } else {
                throw UnauthorizedException::forRolesOrPermissions(
                    $routeAccesses->pluck('role_id')->filter()->map(function ($roleId) {
                        return optional(Role::find($roleId))->name;
                    })->filter()->all(),
                    $routeAccesses->pluck('permission_id')->filter()->map(function ($permissionId) {
                        return optional(Permission::find($permissionId))->name;
                    })->filter()->all()
                );
            }
        } else {
            throw UnauthorizedException::forRolesOrPermissions([], []);
        }

        return $next($request);
    }
}
