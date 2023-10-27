<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        $date_to_run = config('constants.review_deadline_days');
        $schedule->command('expired_feedback:rate_zero')->monthlyOn($date_to_run, '00:05');
        $schedule->command('idea:alert')->quarterlyOn( '1','12:05');
        $schedule->command('self_review:alert')->dailyAt('12:00')->when(function ()
        {
            $alternate_days = [];
            for ($i=0; $i <= config('constants.review_deadline_days'); $i++){
                if($i >= config('constants.review_deadline_days')){
                    $alternate_days[] = config('constants.review_deadline_days');
                }else{
                    $alternate_days[] = ++$i;
                }
            }
            $deadline_date = config('constants.review_deadline_days');
            return in_array($deadline_date, $alternate_days);
        });
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
