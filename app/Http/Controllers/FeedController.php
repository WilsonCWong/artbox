<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class FeedController extends Controller
{

    // The "Home" feed. Shows posts from all users of the site.
    public function home($quantity) {
        $offset = request()->query('offset');

        $posts = Post::select(['id', 'poster_id', 'title', 'description'])
                    ->with('poster:id,username,profile_picture')
                    ->when($offset, function($query, $offset) {
                        return $query->offset($offset);
                    })
                    ->limit($quantity)
                    ->get();

        return response()->json(['posts' => $posts]);
    }
}
