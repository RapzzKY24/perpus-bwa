<?php

use App\Http\Middleware\DynamicRoleAndPermissionMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\App;
use Spatie\Permission\Middleware\RoleMiddleware;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ])->validateCsrfTokens([
            'payments/callback'
        ])->alias(aliases:[
            'role'=> RoleMiddleware::class,
            'dynamic.role_permission' => DynamicRoleAndPermissionMiddleware::class
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
        $exceptions->respond(function(Response $response ,Throwable $exception,Request $request){
            if(!app()->environment(['local','testing']) && in_array($response->getStatusCode(),[500,503,404,403])){
                return inertia('ErrorHandling/ErrorHandling',[
                    'status'=> $response->getStatusCode()
                ])->toResponse($request)->setStatusCode($response->getStatusCode());
            }elseif($response->getStatusCode()===419){
                return back()->with([
                    'message'=> 'The Page Expired,Please Try Again'
                ]);
            }
            return $response;
        });
    })->create();
