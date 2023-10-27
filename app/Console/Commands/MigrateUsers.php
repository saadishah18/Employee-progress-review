<?php

namespace App\Console\Commands;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\Concerns\Has;
use Spatie\Permission\Models\Role;

class MigrateUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'By this command users from previous db migrating to new one';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        DB::connection('mysql')->statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::connection('mysql')->table('users')->truncate();
        DB::connection('mysql')->table('model_has_roles')->truncate();
        $this->info('users migration started');
        $users = DB::connection('mysql_old_data')->table('users')->get();
        foreach ($users as $key => $user){
            $save_array = [
                'id' => $user->id,
                'name' => $user->name,
                'department_id' => $user->department_id,
                'manager_id' => $user->teamlead_id,
                'email' => $user->email,
                'emp_id' => $user->employee_id,
                'email_verified_at' => $user->email_verified_at ,
                'password' => Hash::make('12345678'),
                'designation' => $user->designation,
                'image' => $user->avatar,
                'user_type' => $user->designation,
                'joining_date' => $user->joining != null ? Carbon::parse($user->joining)->toDateString() : null,
                'dob' => null,
                'start_date' =>$user->start_date,
                'end_date' =>$user->end_date,
                'device_token' => null,
                'created_at' => Carbon::parse(),
                'updated_at' => Carbon::parse(),
            ];
            $new_user = User::forceCreate($save_array);
            if($user->is_teamlead == 1){
                $new_user->assignRole('Manager');
            }else{
                $new_user->assignRole('Team Member');
            }
        }

        $this->info('Users moved successfully');
    }
}
