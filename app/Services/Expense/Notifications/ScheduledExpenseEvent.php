<?php

namespace App\Services\Expense\Notifications;

use App\Services\Expense\Models\Expense;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBeUnique;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Queue\SerializesModels;

class ScheduledExpenseEvent extends Notification implements ShouldBeUnique, ShouldBroadcastNow
{
    use Queueable, InteractsWithSockets, SerializesModels, Dispatchable;

    protected Expense $expense;
    /**
     * Create a new notification instance.
     */
    public function __construct(Expense $expense)
    {
        $this->expense = $expense;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'brodcast'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'expense_id' => $this->expense->id,
        ];
    }

    public function toArray($notifiable)
    {
        return [
            'expense' => [
                'id' => $this->expense->id,
            ],
        ];
    }

    public function broadcastOn()
    {
        return new Channel('scheduled');
    }
    public function broadcastAs()
    {
        return 'scheduled-expense';
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage($this->toArray($this->expense));
    }
}
