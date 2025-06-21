<?php

namespace Database\Factories;

use App\Enums\BookStatus;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BookFactory extends Factory
{
    public function definition(): array
    {
        $title = $this->faker->sentence(3);
        return [
            'book_code' => strtoupper(Str::random(8)),
            'title' => $title,
            'slug' => Str::slug($title),
            'author' => $this->faker->name,
            'isbn' => $this->faker->isbn13,
            'price' => $this->faker->numberBetween(50000, 250000),
            'status' => fake()->randomElement(BookStatus::cases())->value,
            'publication_year' => $this->faker->year,
            'cover' => $this->faker->imageUrl(300, 400, 'books', true, 'Book Cover'),
        ];
    }
}
