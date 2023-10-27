<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Question;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departments = Department::all();

        foreach ($departments as $key => $department){
            Question::create([
                'department_id' => $department->id,
                'created_by' => 1,
                'question' => 'He shall exhibited high level of commitments text answer',
                'type' => 'Qualitative',
                'question_for' => 'Manager',
            ]);
        }

        foreach ($departments as $key => $department){
            Question::create([
                'department_id' => $department->id,
                'created_by' => 1,
                'question' => 'Question for rating type answer',
                'type' => 'Quantitative',
                'question_for' => 'Team member',
            ]);
        }



//        Question::create([
//            'department_id' => 1,
//            'created_by' => 1,
//            'question' => 'Suggestion to team member',
//            'type' => 'Qualitative',
//            'question_for' => 'Manager',
//        ]);
//
//        Question::create([
//            'department_id' => 1,
//            'created_by' => 1,
//            'question' => 'Updating Board on monday.com regularly ',
//            'type' => 'Quantitative',
//            'question_for' => 'Manager',
//        ]);
//
//        Question::create([
//            'department_id' => 1,
//            'created_by' => 1,
//            'question' => 'Overall adherence and response time ',
//            'type' => 'Quantitative',
//            'question_for' => 'Manager',
//        ]);
//        Question::create([
//            'department_id' => 1,
//            'created_by' => 1,
//            'question' => 'Overall adherence and response time ',
//            'type' => 'Quantitative',
//            'question_for' => 'Manager',
//        ]);
//
//        Question::create([
//            'department_id' => 1,
//            'created_by' => 1,
//            'question' => 'Challenges faced during work',
//            'type' => 'Qualitative',
//            'question_for' => 'Team member',
//        ]);
//
//        Question::create([
//            'department_id' => 1,
//            'created_by' => 1,
//            'question' => 'Key accomplishment in last month',
//            'type' => 'Qualitative',
//            'question_for' => 'Team member',
//        ]);
//        Question::create([
//            'department_id' => 1,
//            'created_by' => 1,
//            'question' => 'Any other comment',
//            'type' => 'Qualitative',
//            'question_for' => 'Team member',
//        ]);
//
//        Question::create([
//            'department_id' => 1,
//            'created_by' => 1,
//            'question' => 'Rate Your progress',
//            'type' => 'Quantitative',
//            'question_for' => 'Team member',
//        ]);
//        Question::create([
//            'department_id' => 1,
//            'created_by' => 1,
//            'question' => 'Rate Company culture',
//            'type' => 'Quantitative',
//            'question_for' => 'Team member',
//        ]);

    }
}
