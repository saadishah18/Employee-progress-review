<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Feedback;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeedbackTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $months_array = [
            '01' => 'january',
            '02' => 'february',
            '03' => 'march',
            '04' => 'april',
            '05' => 'may',
            '06' => 'june',
            '07' => 'july',
            '08' => 'august',
            '9' => 'september',
//            '10' => 'October',
//            '11' => 'November',
//            '12' => 'December',
        ];


        $departments = Department::all();
        foreach ($departments as $department){
            $users = User::where('department_id','=', $department->id)->get();
            foreach ($users as $u_key => $user){
                foreach ($months_array as $key => $month){
                    Feedback::create([
                        'feedback_to' => $user->id,
                        'feedback_by' => $user->manager_id != null ? $user->manager_id : 1,
                        'title' => 'Feed back for month '.$month,
                        'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                        'is_feedback_given' =>1,
                        'is_self_review_given' =>1,
                        'is_manger_review_given' =>1,
                        'feedback_at' => '2022-'.$key.'-01',
                        'created_at' => '2022-'.$key.'-01',
                    ]);
                }
            }
        }



//        Feedback::create([
//            'feedback_by' => '3',
//            'feedback_to' => '8',
//            'title' => 'Feed back for july',
//            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//        ]);
//        Feedback::create([
//            'feedback_by' => '3',
//            'feedback_to' => '9',
//            'title' => 'Feed back for july',
//            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//        ]);
//        Feedback::create([
//            'feedback_by' => '3',
//            'feedback_to' => '9',
//            'title' => 'Feed back for August',
//            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//        ]);
//        Feedback::create([
//            'feedback_by' => '3',
//            'feedback_to' => '10',
//            'title' => 'Feed back for July',
//            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//        ]);
//        Feedback::create([
//            'feedback_by' => '3',
//            'feedback_to' => '10',
//            'title' => 'Feed back for august',
//            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//        ]);
    }
}
