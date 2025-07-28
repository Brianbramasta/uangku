<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'amount_limit',
        'period',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'amount_limit' => 'decimal:2',
        'start_date' => 'date',
        'end_date' => 'date',
        'period' => 'string',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getUsedAttribute(): float
    {
        return $this->user->transactions()
            ->where('category_id', $this->category_id)
            ->where('type', 'expense')
            ->whereBetween('date', [$this->start_date, $this->end_date])
            ->sum('amount');
    }

    public function getRemainingAttribute(): float
    {
        return $this->amount_limit - $this->used;
    }

    public function getPercentageUsedAttribute(): float
    {
        return $this->amount_limit > 0 ? ($this->used / $this->amount_limit) * 100 : 0;
    }
}
