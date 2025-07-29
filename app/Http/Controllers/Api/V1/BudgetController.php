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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'amount_limit' => 'required|numeric|min:0',
            'period' => 'required|in:monthly,weekly',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date'
        ]);

        $budget = Budget::create([
            'user_id' => Auth::id(),
            'category_id' => $validated['category_id'],
            'amount_limit' => $validated['amount_limit'],
            'period' => $validated['period'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date']
        ]);

        return response()->json([
            'message' => 'Budget created successfully',
            'data' => $budget
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'amount_limit' => 'required|numeric|min:0',
            'period' => 'required|in:monthly,weekly',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date'
        ]);

        $budget = Budget::where('user_id', Auth::id())->findOrFail($id);
        $budget->update($validated);

        return response()->json([
            'message' => 'Budget updated successfully',
            'data' => $budget
        ]);
    }

    public function destroy($id)
    {
        $budget = Budget::where('user_id', Auth::id())->findOrFail($id);
        $budget->delete();

        return response()->json(['message' => 'Budget deleted successfully']);
    }
}
