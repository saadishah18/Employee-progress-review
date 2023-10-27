<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departments = Department::all();
        foreach ($departments as $key => $department) {
            for ($i= 0; $i<=6; $i++){
               $user =  User::forceCreate([
                    'name' => fake()->name(),
                    'email' => fake()->email,
                    'department_id' => $department->id,
                    'email_verified_at' => now(),
                    'password' => Hash::make(12345678), // password
                    'emp_id'=> rand(5,3),
                    'designation' => 'Team Member',
                    'joining_date' => fake()->date('Y-m-d'),
                    'dob' => fake()->date('Y-m-d'),
                    'remember_token' => Str::random(10),
                    'user_type' => 'c'
                ]);
               if($user->id == 1){
                   $user->assignRole('VP');
               }
               elseif($user->id == 2){
                   $user->assignRole('Manager');
               }
               elseif($user->id == 3){
                   $user->assignRole('Team Member');
               }else{
                   $user->assignRole('Team Member');
               }
            }
        }
    }
}
