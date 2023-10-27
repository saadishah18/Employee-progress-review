<?php

namespace App\Console\Commands;

use App\Models\Question;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class MigrateRoles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:roles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Roles migrated to new db successfully';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        DB::connection('mysql')->statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::connection('mysql')->table('roles')->truncate();
        $this->info('roles migration started');
        $roles = DB::connection('mysql_old_data')->table('roles')->get();
        foreach ($roles as $role){
            $save_array[] = [
                'name' => $role->name,
                'guard_name' => 'web',
                'created_at' => Carbon::parse(),
                'updated_at' => Carbon::parse(),
            ];
        }
        $new_roles = Role::insert($save_array);
        $this->info('Roles moved successfully');
    }
}
