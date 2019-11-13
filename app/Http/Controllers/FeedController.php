<?php

namespace App\Http\Controllers;

use App\Post;
use App\User;
use Illuminate\Http\Request;

class FeedController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    // The "Home" feed. Shows $quantity + $offset of posts from all users of the site.
    public function home($quantity) {
        $offset = request()->query('offset');

        $posts = Post::select(['id', 'poster_id', 'title', 'description'])
                    ->with('poster:id,username,profile_picture')
                    ->when($offset, function($query, $offset) {
                        return $query->offset($offset);
                    })
                    ->limit($quantity)
                    ->get();

        phpinfo();

        return response()->json(['posts' => $posts]);
    }

    // The user feed. Gets $quantity + offset of users from the database.
    public function users($quantity) {
        $offset = request()->query('offset');

        $users = User::select(['id', 'username'])
                    ->when($offset, function($query, $offset) {
                        return $query->offset($offset);
                    })
                    ->limit($quantity)
                    ->get();

        return response()->json(['users' => $users]);
    }
}
