<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Publisher;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        
        $operatorRole = Role::firstOrCreate(['name' => 'operator']);
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        // --- Buat user operator ---
        $operatorName = 'Payme Risky1245';
        User::factory()->create([
            'name' => $operatorName,
            'username' => usernameGenerator($operatorName),
            'email' => 'aulia12345@example.com',
            'password' => Hash::make('password123'), 
        ])->assignRole($operatorRole);

       
        $adminName = 'AdminUser';
        User::factory()->create([
            'name' => $adminName,
            'username' => usernameGenerator($adminName),
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'), 
        ])->assignRole($adminRole);
    }
}
