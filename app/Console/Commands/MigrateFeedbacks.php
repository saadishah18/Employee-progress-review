<?php

namespace App\Console\Commands;

use App\Models\Answer;
use App\Models\Feedback;
use App\Models\Question;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class MigrateFeedbacks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:feedbacks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrating previous evaluation result';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        DB::connection('mysql')->statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::connection('mysql')->table('feedbacks')->truncate();
        DB::connection('mysql')->table('answers')->truncate();
        $this->info('feeebacks migration started');
        // below code is for self evaluation migration
        $self_evaluations = DB::connection('mysql_old_data')->table('self_evaluations')->get();
        $self_evaluation_columns = DB::connection('mysql_old_data')->getSchemaBuilder()->getColumnListing('self_evaluations');
        foreach ($self_evaluations as $self_evaluation) {
            $user = User::find($self_evaluation->employee_id);
            $save_self_evaluation_array = [
                'feedback_to' => $self_evaluation->employee_id,
                'feedback_by' => $self_evaluation->employee_id,
                'title' => 'Feedback for the month of ' . date('M',strtotime('01-' . $self_evaluation->period)),
                'description' => 'Feedback detail migrating from old db',
                'is_feedback_given' => 0,
                'is_self_review_given' => 1,
                'is_manger_review_given' => 0,
                'feedback_date' => date('Y-m-d', strtotime('01-' . $self_evaluation->period)),
                'created_at' => $self_evaluation->created_at,
                'updated_at' => $self_evaluation->updated_at,
            ];
            $feedback = Feedback::create($save_self_evaluation_array);
            for ($i = 1; $i <= 9; $i++) {
                $question = Question::where('question', $self_evaluation_columns[$i])
                    ->where('department_id', $user->department_id)
                    ->first();
                if ($question == null) {
                    $question = Question::where('department_id', $user->department_id)
                        ->first();
                }
                if ($question) {
                    $rating = $i < 6 ? $self_evaluation->{$question->question} : 0.0;
//                    dd($rating, $i, $self_evaluation->{$question->question});
                    $answer = $i >= 6 ? $self_evaluation->{$question->question} : null;
                    $save_answers_array = [
                        'question_id' => $question->id,
                        'feedback_id' => $feedback->id,
                        'given_to' => $self_evaluation->employee_id,
                        'given_by' => $self_evaluation->employee_id,
                        'rating' => $rating,
                        'answer' => $answer,
                        'answer_date' => date('Y-m-d', strtotime($feedback->feedback_date)),
                        'old_self_evaluation_id' => $self_evaluation->id,
                    ];
                    $save_answer = Answer::insert($save_answers_array);
                }
            }
        }
        // below code is for manager evaluation migration
        $manager_evaluations = DB::connection('mysql_old_data')->table('manager_evaluations')->get();
        $manager_evaluation_columns = DB::connection('mysql_old_data')->getSchemaBuilder()->getColumnListing('manager_evaluations');
        foreach ($manager_evaluations as $manager_evaluation) {
            $feedback_to_user = User::find($manager_evaluation->employee_id);
            $feedback_to = $feedback_to_user->id;
            $feedback_by = $feedback_to_user->manager_id;
            if($feedback_by == null){
                // in case employee id 1 and feebback given by shafiq which user is not exists now
                $feedback_by = 1;
            }
            $save_manager_evaluation_array = [
                'feedback_to' => $feedback_to,
                'feedback_by' => $feedback_by,
                'title' => 'Feedback for the month of ' . date('M',strtotime('01-' . $manager_evaluation->period)),
                'description' => 'Feedback detail migrating from old db',
                'is_feedback_given' => 1,
                'is_self_review_given' => 1,
                'is_manger_review_given' => 1,
                'feedback_date' => date('Y-m-d', strtotime('01-' . $manager_evaluation->period)),
                'created_at' => $manager_evaluation->created_at,
                'updated_at' => $manager_evaluation->updated_at,
            ];
            $feedback = Feedback::create($save_manager_evaluation_array);
            if ($manager_evaluation->id < 184) {
                for ($i = 1; $i <= 9; $i++) {
                    $question = Question::where('question', $manager_evaluation_columns[$i])
                        ->where('department_id', $feedback_to_user->department_id)
                        ->first();
                    if($question == null){
                        dd($manager_evaluation, $manager_evaluation_columns[$i]);
                    }
                    $rating = $i < 6 ? $manager_evaluation->{$question->question} : 0.0;
                    $answer = $i >= 6 ? $manager_evaluation->{$question->question} : null;
                    $save_answers_array = [
                        'question_id' => $question->id,
                        'feedback_id' => $feedback->id,
                        'given_to' => $feedback_to,
                        'given_by' => $feedback_by,
                        'rating' => $rating,
                        'answer' => $answer,
                        'answer_date' => date('Y-m-d', strtotime($feedback->feedback_date)),
                        'old_manager_evaluation_id' => $manager_evaluation->id,
                        'old_question_id' => $question->id,
                    ];
                    $save_answer = Answer::insert($save_answers_array);
                }
            } else {
                $manager_evaluation_answers = DB::connection('mysql_old_data')->table('manager_evaluation_answers')
                    ->where('manager_evaluation_id', $manager_evaluation->id)->get();
                foreach ($manager_evaluation_answers as $key => $answer) {
                    $new_question = Question::where('old_question_id', $answer->question_id)->first();
                    $rating =  $answer->answer;
                    $save_answers_array = [
                        'question_id' => $new_question->id,
                        'feedback_id' => $feedback->id,
                        'given_to' => $feedback_to,
                        'given_by' => $feedback_by,
                        'rating' => $rating,
                        'answer' => null,
                        'answer_date' => date('Y-m-d', strtotime($feedback->feedback_date)),
                        'old_question_id' => $answer->question_id,
                        'old_manager_evaluation_id' => $manager_evaluation->id,

                    ];
                    $save_answer = Answer::insert($save_answers_array);
                }
                for ($i = 6; $i <= 9; $i++) {
                    $question = Question::where('question', $manager_evaluation_columns[$i])
                        ->where('department_id', $feedback_to_user->department_id)
                        ->first();
                    $answer = $i >= 6 ? $manager_evaluation->{$question->question} : null;
                    $save_answers_array = [
                        'question_id' => $question->id,
                        'feedback_id' => $feedback->id,
                        'given_to' => $feedback_to,
                        'given_by' => $feedback_by,
                        'rating' => 0.0,
                        'answer' => $answer,
                        'answer_date' => date('Y-m-d', strtotime($feedback->feedback_date)),
                        'old_question_id' => $question->id,
                        'old_manager_evaluation_id' => $manager_evaluation->id,
                    ];
                    $save_answer = Answer::insert($save_answers_array);
                }
            }
        }
        $this->info('Previous Ratings moved successfully');
    }
}
