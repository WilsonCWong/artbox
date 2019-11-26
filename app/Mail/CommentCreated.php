<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CommentCreated extends Mailable
{
    use Queueable, SerializesModels;

    public $comment, $post;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($post, $comment)
    {
        $this->post = $post;
        $this->comment = $comment;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mail.comment-created');
    }
}
