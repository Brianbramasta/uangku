<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Budget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BudgetController extends Controller
{
    public function index(Request $request)
    {
        $budgets = Budget::where('user_id', Auth::id())
            ->with('category')
            ->when($request->period, fn($q) => $q->where('period', $request->period))
            ->when($request->category_id, fn($q) => $q->where('category_id', $request->category_id))
            ->get();

        return response()->json([
            'data' => $budgets->map(function ($budget) {
                return [
                    'id' => $budget->id,
                    'category_id' => $budget->category_id,
                    'category_name' => $budget->category->name,
                    'amount_limit' => $budget->amount_limit,
                    'used' => $budget->used,
                    'remaining' => $budget->remaining,
                    'percentage_used' => $budget->percentage_used,
                    'period' => $budget->period,
                    'start_date' => $budget->start_date,
                    'end_date' => $budget->end_date
                ];
            })
        ]);
    }
}
