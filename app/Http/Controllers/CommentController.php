<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }

    public function store(Post $post) {
        $attributes = $this->validateComment();
        $attributes['commenter_id'] = auth()->user()->id;
        $post->createComment($attributes);

        return response('Comment posted.', 200);
    }

    public function update(Comment $comment) {
        $comment->update($this->validateComment());
        return response('Comment updated.', 200);
    }

    public function destroy(Comment $comment) {
        $comment->delete();
        return response('Comment deleted.', 200);
    }

    protected function validateComment() {
        return request()->validate([
           'comment' => ['required', 'string', 'min:1', 'max:2000'],
        ]);
    }
}
