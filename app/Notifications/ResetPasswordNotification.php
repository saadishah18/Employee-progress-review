<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public $token;
    public $type;

    public function __construct($token, $request_type = null)
    {
        $this->token = $token;
        $this->type = $request_type;

    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = url(route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ], false));
        if ($this->type == 'api') {
            return (new MailMessage)
                ->subject(__('Reset Your Password!'))
                ->line(__('You are receiving this email because we received a password reset request for your account.'))
                ->line('Your temporary password is ' . $this->token)
//            ->action(__('Reset Password'), $url)
//            ->line(__('This password reset link will expire in :count minutes.', ['count' => config('auth.passwords.'.config('auth.defaults.passwords').'.expire')]))
                ->line(__('If you did not request a password reset, no further action is required.'));
        } else {
            return (new MailMessage)
                ->subject(__('Reset Your Password!'))
                ->line(__('You are receiving this email because we received a password reset request for your account.'))
//                ->line('Your temporary password is '.$this->token)
                ->action(__('Reset Password'), $url)
                ->line(__('This password reset link will expire in :count minutes.', ['count' => config('auth.passwords.' . config('auth.defaults.passwords') . '.expire')]))
                ->line(__('If you did not request a password reset, no further action is required.'));
        }

    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
