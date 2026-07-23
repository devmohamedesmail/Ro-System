<?php

namespace App\Models;

use App\Models\Inventory;
use Database\Factories\CompanyFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    /** @use HasFactory<CompanyFactory> */
    use HasFactory;

    protected $fillable = [
        'name',

        'email',

        'phone',

        'whatsapp',

        'website',

        'description',

        'country',

        'city',

        'address',

        'logo',

        'slug',

        'company_code',

        'public_id',

    ];

    public function stations(): HasMany
    {
        return $this->hasMany(Station::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }



    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }
}