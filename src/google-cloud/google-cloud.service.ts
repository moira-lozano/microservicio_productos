import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as child_process from 'child_process';

@Injectable()
export class GoogleCloudService {
  constructor(
    private readonly configService: ConfigService,
  ) { }

  async getAccessToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      child_process.exec('gcloud auth application-default print-access-token', (error, stdout, stderr) => {
        if (error) {
          reject(`Error obtaining access token: ${stderr}`);
        }
        resolve(stdout.trim());
      });
    });
  }

  async processImage(base64Image: string): Promise<string[]> {
    try {
      const token = await this.getAccessToken(); // Obtiene el token de acceso
      console.log('apikery', token)
      const url = `https://vision.googleapis.com/v1/images:annotate`; 

      const requestBody = {
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: 'LABEL_DETECTION', maxResults: 10 }]
          }
        ]
      };

      console.log('Request to Google Vision API:', requestBody);

      const response = await axios.post(url, requestBody, {
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response from Google Vision API:', response.data);

      if (response.status === 200) {
        const labels = response.data.responses[0].labelAnnotations.map(
          (label: any) => label.description
        );
        return labels;
      } else {
        console.error('Error in response from API:', response.data);
        throw new Error('Failed to process image');
      }
    } catch (error) {
      console.error('Error in request to Google Vision API:', error.response?.data || error.message);
      throw new Error('Error processing image');
    }
  }
}