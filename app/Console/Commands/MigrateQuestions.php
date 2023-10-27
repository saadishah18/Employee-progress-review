<?php

namespace App\Console\Commands;

use App\Models\Department;
use App\Models\Question;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class MigrateQuestions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:questions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        DB::connection('mysql')->statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::connection('mysql')->table('questions')->truncate();
        $this->info('questions migration started');
//        $departments = Department::whereIn('name',['Android','IOS','Laravel','UI/UX','Frontend','Javascript','Artificial Intelligence','SQA'])->get();
        $departments = Department::all();

        $self_evaluation_columns = DB::connection('mysql_old_data')->getSchemaBuilder()->getColumnListing('self_evaluations');
        $counter = 1;

        foreach ($departments as $key => $department){
//            $save_array = [];
//            $save_manger_array = [];
            for ($i = 1; $i <= 9; $i++) {
                $type = $counter < 6 ? 'Quantitative' : 'Qualitative';
                $save_self_questions_array [] = [
                    'question' => $self_evaluation_columns[$i],
                    'type' => $type,
                    'department_id' => $department->id,
                    'question_for' => 'Team member',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            $manager_evaluation_columns = DB::connection('mysql_old_data')->getSchemaBuilder()->getColumnListing('manager_evaluations');
            for ($j = 1; $j <= count($manager_evaluation_columns); $j++) {
                if ($j < 10) {
                    $type = 'Qualitative';
                    $save_manger_array[] = [
                        'question' => $manager_evaluation_columns[$j],
                        'type' => $type,
                        'department_id' => $department->id,
                        'question_for' => 'Manager',
                        'created_at' => Carbon::parse(),
                        'updated_at' => Carbon::parse(),
                    ];
                }
            }
        }
        $self_questions = Question::insert($save_self_questions_array);
        $questions = Question::insert($save_manger_array);

        $old_questions = DB::connection('mysql_old_data')->table('questions')->get();
        $save_new_array = [];
        foreach ($old_questions as $ques){
            $question_for = $ques->is_teamLead == 1 ? 'Manager' :  'Team member';
            $save_new_array[] = [
                'question' => $ques->question,
                'old_question_id' => $ques->id,
                'type' => 'Quantitative',
                'department_id' => $ques->department_id,
                'question_for' => $question_for,
                'created_at' => $ques->created_at,
                'updated_at' => $ques->updated_at,
            ];
        }
        $new_questions = Question::insert($save_new_array);
        $this->info('Questions moved successfully');

    }
}
