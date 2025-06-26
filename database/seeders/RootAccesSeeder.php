<?php

namespace Database\Seeders;

use App\Models\RouteAccess;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Role;

class RootAccesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $admin_role = Role::findOrCreate('admin');
        $operator_role = Role::findOrCreate('operator');
        $member_role = Role::findOrCreate('member');
        
        $admin_route = collect(Route::getRoutes())->filter(function($route){
            return str_starts_with($route->getName(),'admin.') ||
            str_starts_with($route->getName(),'profile.') ||
            $route->getName() === 'dashboard';
        });

        foreach($admin_route as $route){
            RouteAccess::create([
                'route_name' => $route->getName(),
                'role_id' => $admin_role->id,
                'permission_id' => null
            ]);
        }

        $operator_prefixs = [
            'admin.categories',
            'admin.publishers',
            'admin.books',
            'admin.user',
            'admin.fine-settings',
            'admin.loans',
            'admin.return-books',
            'admin.announcements'
        ];

        $operator_route = collect(Route::getRoutes())->filter(function($route)use($operator_prefixs){
           return in_array($route->getName(),['dashboard','profile']) ||
           collect($operator_prefixs)->contains(function($prefix)use($route){
            return str_starts_with($route->getName(),$prefix);
           });
        });

        foreach($operator_route as $route){
            RouteAccess::create([
                'route_name' => $route->getName(),
                'role_id' => $operator_role->id,
                'permission_id' => null
            ]);
        }


        $member_route = collect(Route::getRoutes())->filter(function($route){
            return str_starts_with($route->getName(),'front.') ||
            str_starts_with($route->getName(),'profile.') ||
            $route->getName() === 'dashboard';
        });


        foreach($member_route as $route){
            RouteAccess::create([
                'route_name' => $route->getName(),
                'role_id' => $member_role->id,
                'permission_id' => null
            ]);
        }

    }
}
