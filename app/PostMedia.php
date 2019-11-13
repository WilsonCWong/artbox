<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\PostMedia
 *
 * @property int $id
 * @property int $post_id
 * @property string $content_url
 * @property string $content_type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Post $post
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PostMedia newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PostMedia newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PostMedia query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PostMedia whereContentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PostMedia whereContentUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PostMedia whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PostMedia whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PostMedia wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PostMedia whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PostMedia extends Model
{
    protected $guarded = [];

    public function post() {
        return $this->belongsTo(Post::class);
    }
}
