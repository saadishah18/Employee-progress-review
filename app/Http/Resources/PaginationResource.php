<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaginationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        if ($this->isEmpty()) {
            return [
                'total_records' => 0,
                'page_records' => 0,
                'per_page' => (int)config('constants.per_page'),
                'current_page' => 1,
                'total_pages' => 1
            ];
        }
        return [
            'total_records' => (int)$this->total(),
            'page_records' => (int)$this->count(),
            'per_page' => (int)$this->perPage(),
            'current_page' => (int)$this->currentPage(),
            'total_pages' => (int)$this->lastPage()
        ];
    }
}
