<?php

namespace App\Console\Commands;

use App\Models\Department;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MigrateDepartments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:departments';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrating old departments to new db';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        DB::connection('mysql')->statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::connection('mysql')->table('departments')->truncate();
        $this->info('Departments migration started');
        $departments = DB::connection('mysql_old_data')->table('departments')->get();
//        DB::connection('mysql')->statement('SET FOREIGN_KEY_CHECKS=1;');
        foreach ($departments as $department){

            $save_array[] = [
                'id' => $department->id,
                'name' => $department->name,
                'type' => $department->name,
                'color' => '#fffnd',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => Carbon::parse(),
                'updated_at' => Carbon::parse(),
            ];
        }
        $new_departments = Department::insert($save_array);
        $this->info('Departments moved successfully');
    }
}
