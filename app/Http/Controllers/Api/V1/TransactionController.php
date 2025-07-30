<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = Transaction::with('category')
            ->where('user_id', Auth::id());

        if ($request->filled('start_date')) {
            $query->whereDate('date', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('date', '<=', $request->end_date);
        }

        if ($request->filled('type')) {
            $query->where('type', '=', $request->type);
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', '=', $request->category_id);
        }

        $transactions = $query->latest('date')
            ->paginate($request->input('limit', 10));

        return response()->json([
            'data' => $transactions->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'category' => [
                        'id' => $transaction->category->id,
                        'name' => $transaction->category->name,
                        'type' => $transaction->category->type,
                        'icon' => $transaction->category->icon,
                    ],
                    'amount' => $transaction->amount,
                    'type' => $transaction->type,
                    'date' => $transaction->date->format('Y-m-d'),
                    'note' => $transaction->note,
                ];
            }),
            'pagination' => [
                'total' => $transactions->total(),
                'current_page' => $transactions->currentPage(),
                'last_page' => $transactions->lastPage(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:income,expense',
            'date' => 'required|date_format:Y-m-d',
            'note' => 'nullable|string',
        ]);

        $transaction = Transaction::create([
            'user_id' => Auth::id(),
            'category_id' => $validated['category_id'],
            'amount' => $validated['amount'],
            'type' => $validated['type'],
            'date' => $validated['date'],
            'note' => $validated['note'],
        ]);

        return response()->json(['message' => 'Transaction created successfully', 'data' => $transaction]);
    }

    public function update(Request $request, Transaction $transaction)
    {
        if ($transaction->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action');
        }

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:income,expense',
            'date' => 'required|date_format:Y-m-d',
            'note' => 'nullable|string',
        ]);

        $transaction->update($validated);

        return response()->json(['message' => 'Transaction updated successfully', 'data' => $transaction]);
    }

    public function destroy(Transaction $transaction)
    {
        if ($transaction->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action');
        }

        $transaction->delete();

        return response()->json(['message' => 'Transaction deleted successfully']);
    }
}
