<?php

namespace App\Services;

use Cloudinary\Cloudinary;

class CloudinaryService
{
      public function uploadToCloudinary($file, string $folder): ?array
    {
        try {
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => config('services.cloudinary.cloud_name'),
                    'api_key'    => config('services.cloudinary.api_key'),
                    'api_secret' => config('services.cloudinary.api_secret'),
                ],
            ]);

            $result = $cloudinary->uploadApi()->upload(
                $file->getRealPath(),
                ['folder' => $folder]
            );

            // return $result['secure_url'];
            
            return [
               "url"=>$result['secure_url'],
               "public_id"=> $result['public_id']
            ];
        } catch (\Exception $e) {
            return null;
        }
    }

    public function deleteFromCloudinary(string $publicId): bool{
        try {
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => config('services.cloudinary.cloud_name'),
                    'api_key'    => config('services.cloudinary.api_key'),
                    'api_secret' => config('services.cloudinary.api_secret'),
                ],
            ]);

            $cloudinary->uploadApi()->destroy($publicId);
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }
}
