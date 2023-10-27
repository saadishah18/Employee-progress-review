<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Department;
use App\Models\Feedback;
use App\Models\Question;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TestController extends Controller
{
    public function generateData()
    {

        die('here');
        $current_month = Carbon::now()->monthName;


        $months_array = [
            '1' => 'january',
            '2' => 'february',
            '3' => 'march',
            '4' => 'april',
            '5' => 'may',
            '6' => 'june',
            '7' => 'july',
            '8' => 'august',
            '9' => 'september',
        ];

        foreach ($months_array as $key => $month) {
            $feedback_custom_title = 'Feedback for the month of ' . $month;

            $save_data = [
                'title' => $feedback_custom_title,
                'department_id' => 1,
                'feedback_to' => 12,
                'feedback_by' => 3,
                'is_feedback_given' => 1,
                'is_self_review_given' => 1,
                'is_manger_review_given' => 1,
            ];
            Feedback::forceCreate($save_data);
        }

        $feedbacks = Feedback::where('id', '>', 6)->get();
        $questions = Question::all();
        $department_id = Department::where('type', 'laravel')->pluck('id')->first();
        $given_by_manager = User::where('department_id', $department_id)->where('designation', 'Manager')->first();
        foreach ($feedbacks as $key => $feedback) {
            foreach ($questions as $question_key => $question) {
                $answer = $question->type === 'Qualitative' ? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' : null;
                $rating = $question->type === 'Qualitative' ? null : random_int(0, 5);
                Answer::forceCreate([
                    'question_id' => $question->id,
                    'feedback_id' => $feedback->id,
                    'given_to' => 12,
                    'given_by' => 3,
                    'rating' => $rating,
                    'answer' => $answer,
                ]);
            }
        }

    }

    public function generate_users()
    {
        $department = Department::where('id', 8)->first();
        for ($i = 0; $i <= 8; $i++) {
            $designation = $i == 0 ? 'Manager' : 'Team Member';
            $user = User::forceCreate([
                'name' => fake()->name(),
                'email' => fake()->email,
                'department_id' => $department->id,
                'email_verified_at' => now(),
                'password' => Hash::make(12345678), // password
                'emp_id' => rand(5, 3),
                'designation' => $designation,
                'joining_date' => fake()->date('Y-m-d'),
                'dob' => fake()->date('Y-m-d'),
                'remember_token' => Str::random(10),
                'user_type' => 'c'
            ]);
            /* if($user->id == 1){
                 $user->assignRole('VP');
             }
             elseif($user->id == 2){
                 $user->assignRole('Manager');
             }
             elseif($user->id == 3){
                 $user->assignRole('Team Member');
             }else{
                 $user->assignRole('Team Member');
             }*/
            if ($i == 0) {
                $user->assignRole('Manager');

            } else {
                $user->assignRole('Team Member');
            }
        }
        echo "users completed";
    }

    public function generate_questions()
    {


        $questions_manger = array(
            array('question' => 'Suggestion to team member', 'type' => 'Qualitative', 'min_rating' => NULL, 'max_rating' => NULL, 'question_for' => 'Manager', 'created_at' => '2022-09-28 12:35:23', 'updated_at' => '2022-09-28 12:35:23'),
//            array('question' => 'Updating Board on monday.com regularly','type' => 'Qualitative','min_rating' => NULL,'max_rating' => NULL,'question_for' => 'Manager','created_at' => '2022-09-28 12:35:23','updated_at' => '2022-09-28 12:35:23'),
//            array('question' => 'Overall adherence and response time','type' => 'Qualitative','min_rating' => NULL,'max_rating' => NULL,'question_for' => 'Manager','created_at' => '2022-09-28 12:35:23','updated_at' => '2022-09-28 12:35:23'),
//            array('question' => 'He shall exhibited high level of commitments text answer','type' => 'Qualitative','min_rating' => NULL,'max_rating' => NULL,'question_for' => 'Manager','created_at' => '2022-09-28 12:35:23','updated_at' => '2022-09-28 12:35:23'),
//            array('question' => 'Full fill deadlines','type' => 'Quantitative','min_rating' => NULL,'max_rating' => NULL,'question_for' => 'Manager','created_at' => '2022-09-28 12:35:23','updated_at' => '2022-09-28 12:35:23'),
            array('question' => 'Team collabaoration', 'type' => 'Quantitative', 'min_rating' => NULL, 'max_rating' => NULL, 'question_for' => 'Manager', 'created_at' => '2022-09-28 12:35:23', 'updated_at' => '2022-09-28 12:35:23')
        );

        $questions_self = array(
            array('question' => 'Compensation Satisfaction', 'type' => 'Quantitative', 'min_rating' => NULL, 'max_rating' => NULL, 'question_for' => 'Team member', 'created_at' => '2022-09-28 12:35:23', 'updated_at' => '2022-09-28 12:35:23'),
//            array('question' => 'Professionl growth','type' => 'Quantitative','min_rating' => NULL,'max_rating' => NULL,'question_for' => 'Team member','created_at' => '2022-09-28 12:35:23','updated_at' => '2022-09-28 12:35:23'),
//            array('question' => 'Skill Set improvment','type' => 'Quantitative','min_rating' => NULL,'max_rating' => NULL,'question_for' => 'Team member','created_at' => '2022-09-28 12:35:23','updated_at' => '2022-09-28 12:35:23'),
            array('question' => 'Any other comment', 'type' => 'Qualitative', 'min_rating' => NULL, 'max_rating' => NULL, 'question_for' => 'Team member', 'created_at' => '2022-09-28 12:35:23', 'updated_at' => '2022-09-28 12:35:23'),
//            array('question' => 'Rate Your progress','type' => 'Quantitative','min_rating' => NULL,'max_rating' => NULL,'question_for' => 'Team member','created_at' => '2022-09-28 12:35:23','updated_at' => '2022-09-28 12:35:23'),
//            array('question' => 'Rate Company culture','type' => 'Quantitative','min_rating' => NULL,'max_rating' => NULL,'question_for' => 'Team member','created_at' => '2022-09-28 12:35:23','updated_at' => '2022-09-28 12:35:23'),
//            array('question' => 'Key accomplishment in last month','type' => 'Qualitative','min_rating' => NULL,'max_rating' => NULL,'question_for' => 'Team member','created_at' => '2022-09-28 12:35:23','updated_at' => '2022-09-28 12:35:23'),
//            array('question' => 'Challenges faced during work','type' => 'Qualitative','min_rating' => NULL,'max_rating' => NULL,'question_for' => 'Team member','created_at' => '2022-09-28 12:35:23','updated_at' => '2022-09-28 12:35:23'),
        );

        $department = Department::where('id', 8)->first();

        foreach ($questions_manger as $key => $question) {
            Question::forceCreate([
                'department_id' => $department->id,
                'created_by' => 1,
                'question' => $question['question'],
                'type' => $question['type'],
                'question_for' => $question['question_for'],
            ]);
        }

        foreach ($questions_self as $key => $question) {
            Question::forceCreate([
                'department_id' => $department->id,
                'created_by' => 1,
                'question' => $question['question'],
                'type' => $question['type'],
                'question_for' => $question['question_for'],
            ]);
        }
        echo "done";
    }

    public function generate_feedbacks()
    {
        $user = User::where('id', '=', 43)->first();
        $months_array = [
            '01' => 'january',
            '02' => 'february',
            '03' => 'march',
            '04' => 'april',
            '05' => 'may',
            '06' => 'june',
//            '07' => 'july',
//            '08' => 'august',
//            '9' => 'september',
//            '10' => 'October',
//            '11' => 'November',
//            '12' => 'December',
        ];

        //for manager review
//        foreach ($users as $u_key => $user){
        foreach ($months_array as $key => $month) {
            $feedback = Feedback::create([
                'feedback_to' => $user->id,
                'feedback_by' => $user->manager_id,
                'title' => 'self Feed back for month ' . $month,
                'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                'is_feedback_given' => 1,
                'is_self_review_given' => 1,
                'is_manger_review_given' => 1,
                'feedback_date' => '2022-' . $key . '-01',
            ]);
            $questions = Question::where('department_id', '9')->where('question_for', 'Manager')->get();
            foreach ($questions as $question_key => $question) {
                $answer = $question->type === 'Qualitative' ? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' : null;
                $rating = $question->type === 'Qualitative' ? null : random_int(0, 5);
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

//        }
        echo "feedback complete";
    }

    public function get_old_users()
    {
        $users = DB::connection('mysql2')->table('users')->get();
        dd($users);
    }


    public function saveDepartments()
    {
        $old_departments = DB::connection('mysql2')->table('departments')->get();

    }


    public function importUsers()
    {
        DB::connection('mysql')->statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::connection('mysql')->table('users')->truncate();
        $path = Storage::path("public/all-employees.json");
        $users_data = json_decode(file_get_contents($path), true);
        foreach ($users_data as $data) {
            $department = Department::where('name', $data['Department'])->first();
            if ($department == null) {
                $department = Department::create(['name' => $data['Department']]);
            }
            $user_array = [
                'department_id' => $department->id,
                'manager_id' => null,
                'name' => $data['Name'],
                'email' => $data['Email'],
                'emp_id' => $data['Employee Code'],
                'email_verified_at' => now(),
                'password' => Hash::make('12345678'),
                'designation' => $data['Designation'],
                'joining_date' => $data['DOJ'],
                'dob' => $data['DOB'],
            ];

            $user = User::create($user_array);
            if ($user->id == 1) {
                $user->assignRole('Director');
            }
        }
        echo "users created";
    }

    public function makeTeamLeads()
    {
        $path = Storage::path("public/teamleads.json");
        $leads_data = json_decode(file_get_contents($path), true);
        foreach ($leads_data as $data) {
            $user = User::where('email', $data['Email'])->first();
            if ($data['Teamlead'] != 'Null') {
                $get_lead = User::where('emp_id', $data['Teamlead'])->first();
                $user->manager_id = $get_lead->id;
                $user->update();
            }
        }
        echo "team lead updated";
    }

    public function updateRoles()
    {
        $users = User::where('id', '>', 1)->get();
        foreach ($users as $user) {
            if ($user->is_team_lead == 1) {
                $user->assignRole('Manager');
            } else {
                $user->assignRole('Team Member');
            }
        }
        echo "Role updated";
    }

}
