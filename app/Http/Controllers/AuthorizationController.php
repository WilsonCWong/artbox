<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class AuthorizationController extends Controller
{
    public function canUpdatePost(Post $post) {
        $authorized = auth()->user()->can('update', $post);
        return response()->json(['authorized' => $authorized], 200);
    }

    public function canUpdateComment(Comment $comment) {
        $authorized = auth()->user()->can('update', $comment);
        return response()->json(['authorized' => $authorized], 200);
    }

}
