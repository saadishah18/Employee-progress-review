<?php

namespace App\Console\Commands;

use App\Models\Idea;
use App\Models\User;
use App\Notifications\FcmNotification;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ideaNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'idea:alert';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notification for employees to submit idea';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $month = Carbon::parse()->month;
        $user_ids = Idea::whereMonth('created_at',$month)->pluck('submitted_by')->toArray();

        $users = User::whereNotIN('id',$user_ids)->get();
//        dd($users->whereIN('id',[4,44]));
        foreach ($users as $user){
            $notification_data = [
                'to' => $user->device_token,
                'sending_user_id' => $user->id,
                'receiving_user_id' => $user->id,
                'title' => 'EEP',
                'body' => ucfirst($user->name) . ', your idea submission is pending.',
                'data' =>  [
                    'user_id' => $user->id,
                    'month' => $month,
                    'year' => date('Y'),
                ]
            ];
            $user->notify(new FcmNotification($notification_data));
        }
    }
}
