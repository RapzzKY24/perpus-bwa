<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'name'=> $name = $this->faker->unique()->randomElement([
                'Fiksi',
                'Non-Fiksi',
                'Novel Remaja',
                'Biografi',
                'Ilmu Pengetahuan Alam',
                'Teknologi Informasi',
                'Bahasa dan Sastra',
                'Matematika',
                'Sejarah Dunia',
                'Anak-anak',
                'Pengembangan Diri',
                'Religi dan Spiritualitas',
                'Psikologi',
                'Kesehatan & Gaya Hidup',
                'Hukum & Politik',
                'Komik & Manga',
                'Ekonomi & Bisnis',
                'Sains Populer',
                'Filsafat',
                'Petualangan & Misteri'
            ]),
            'slug'=> str()->lower(str()->slug($name).str()->random(4)),
            'description' => $this->faker->sentence(8),
        ];
    }
}
