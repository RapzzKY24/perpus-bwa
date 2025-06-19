<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Publisher;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Payme Risky12',
            'username'=>'Rapzzky12',
            'email' => 'aulia123@example.com',
            'password'=>'12345678'
        ]);

        // Publisher::factory()->count(10)->create();

        // Category::factory()->count(32)->create();

    }
}
