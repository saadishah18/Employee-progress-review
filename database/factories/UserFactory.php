<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => $this->faker->email,
            'email_verified_at' => now(),
            'password' => Hash::make(12345678), // password
            'emp_id'=> rand(5,3),
            'designation' => 'Employee',
            'joining_date' => fake()->date('Y-m-d'),
            'dob' => fake()->date('Y-m-d'),
            'remember_token' => Str::random(10),
            'user_type' => 'employee'
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
