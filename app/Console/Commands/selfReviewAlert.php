<?php

namespace App\Console\Commands;

use App\Developer\Services\FeedbackService;
use Illuminate\Console\Command;

class selfReviewAlert extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'self_review:alert';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notification send to employees for pending self rating';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try {
            $service = new FeedbackService();
            $service->selfFeedbackPendingEmployees();
            $this->info('Notification send to all pending employees for self rating');

        }catch (\Exception $exception){
            $this->info($exception->getMessage().'<br>'.$exception->getLine().'<br>'.$exception->getFile());
            return $exception->getMessage().'<br>'.$exception->getLine().'<br>'.$exception->getFile();
        }
    }
}
