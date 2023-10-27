<?php

namespace Database\Seeders;

use App\Models\Answer;
use App\Models\Department;
use App\Models\Feedback;
use App\Models\Question;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnswersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        $feedbacks = Feedback::all(); //336
//        $questions = Question::all(); // 26
        $departments = Department::all(); // 6
        foreach ($departments as $dp_key => $department){
            $users = User::where('department_id', $department->id)->get();
            foreach ($users as $u_index => $user){
                $feedbacks = Feedback::where('feedback_to',$user->id)->get();
                foreach ($feedbacks as $key => $feedback){
                    $questions = Question::where('department_id',$department->id)->get();
                    foreach ($questions as $question_key => $question){
                        $answer = $question->type === 'Qualitative' ? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' : null;
                        $rating = $question->type === 'Qualitative' ? null : random_int(0,5);
                        Answer::create([
                            'question_id' => $question->id,
                            'feedback_id' => $feedback->id,
                            'given_to' => $user->id,
                            'given_by' => $user->manager_id,
                            'rating' => $rating,
                            'answer' => $answer,
                        ]);
                    }
                }
            }
        }
    }
}
