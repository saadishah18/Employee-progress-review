<?php

namespace App\Notifications;

use App\Notifications\drivers\FCMDriver;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FcmNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public $title;
    public $body;
    public $notification_data;

    public function __construct($data)
    {
        $this->title = $data['title'] ?? '';
        $this->body = $data['body'] ?? '';
        $this->notification_data = $data['data'];
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', FCMDriver::class];
    }
    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return $this->notification_data;
    }
}
