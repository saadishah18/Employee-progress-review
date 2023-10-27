<?php

namespace App\Console\Commands;

use App\Developer\Services\FeedbackService;
use Illuminate\Console\Command;

class RateUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'expired_feedback:rate_zero';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Employees who did not give self rating to them selves rated 0';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try {
            $service = new FeedbackService();
            $service->saveAutoSelfRating();
            $this->info('Successfully rated users');

        }catch (\Exception $exception){
            $this->info($exception->getMessage().'<br>'.$exception->getLine().'<br>'.$exception->getFile());
            $this->error($exception->getMessage().'<br>'.$exception->getLine().'<br>'.$exception->getFile());
            return $exception->getMessage().'<br>'.$exception->getLine().'<br>'.$exception->getFile();
        }
    }
}
