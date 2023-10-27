<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'name' => 'VP',
            'guard_name' => 'web',
        ]);
        Role::create([
            'name' => 'manager',
            'guard_name' => 'web',
        ]);
        Role::create([
            'name' => 'Team Member',
            'guard_name' => 'web',
        ]);
    }
}
