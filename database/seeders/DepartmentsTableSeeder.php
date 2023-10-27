<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departments = [
            'Laravel'=> 'backend',
            'Frontend' => 'frontend',
            'Blockchain' => 'blockchain',
            'React' => 'react_js',
            'Node'=> 'backend',
            'Flutter' => 'mobile_development'
        ];
        $colors = [
            'light_red-#F72717',
            'orange-rgb(221,75,37)',
            'light_purple-rgb(17,30,50)',
            'sky_blue-rgb(98,218,251)',
            'green-rgb(5,110,3)',
            'white-255,255,255'];
        $counter = 0;
        foreach($departments as $key => $department){
            Department::create([
                'name' => $key,
                'type' => $department,
                'color' => $colors[$counter],
                'created_by' => 1,
                'updated_by' => 1,
            ]);
            $counter++;
        }
    }
}
