<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostMedia extends Model
{
    protected $guarded = [];

    public function post() {
        return $this->belongsTo(Post::class);
    }
}
