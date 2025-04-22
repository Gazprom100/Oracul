import React from 'react';
import { Card } from '../components/ui/Card';
import { CardHeader } from '../components/ui/CardHeader';
import { CardContent } from '../components/ui/CardContent';

export default function CardDemo() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Card Component Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Card */}
        <Card>
          <CardHeader title="Basic Card" />
          <CardContent>
            <p>This is a basic card with default padding and styling.</p>
          </CardContent>
        </Card>

        {/* Card with subtitle */}
        <Card>
          <CardHeader 
            title="Card with Subtitle" 
            subtitle="This is a descriptive subtitle" 
          />
          <CardContent>
            <p>This card demonstrates the use of a subtitle in the header.</p>
          </CardContent>
        </Card>

        {/* Card with actions */}
        <Card>
          <CardHeader 
            title="Card with Actions" 
            actions={
              <button className="px-3 py-1 bg-blue-500 text-white rounded-md">
                Action
              </button>
            }
          />
          <CardContent>
            <p>This card has an action button in the header.</p>
          </CardContent>
        </Card>

        {/* Card with small padding */}
        <Card>
          <CardHeader title="Small Padding" />
          <CardContent padding="small">
            <p>This card uses the small padding option for its content.</p>
          </CardContent>
        </Card>

        {/* Card with no padding */}
        <Card>
          <CardHeader title="No Padding" />
          <CardContent padding="none">
            <div className="bg-gray-100 dark:bg-gray-700 p-4">
              <p>This card has no padding in its content section, allowing content to extend to the edges.</p>
            </div>
          </CardContent>
        </Card>

        {/* Bordered card variant */}
        <Card variant="bordered">
          <CardHeader title="Bordered Variant" />
          <CardContent>
            <p>This card uses the bordered variant instead of the default shadowed style.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 