<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Publisher;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => $name ='Payme Risky1245',
            'username'=>usernameGenerator($name),
            'email' => 'aulia12345@example.com',
        ])->assignRole(Role::create(['name'=>'operator']));

        // Publisher::factory()->count(10)->create();

        // Category::factory()->count(32)->create();

    }
}
