import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Save, RotateCcw } from 'lucide-react';
import { siteNames, indicators, units } from '@/data/mockData';

interface FormData {
  date: string;
  siteName: string;
  indicator: string;
  value: string;
  notes: string;
}

const initialFormData: FormData = {
  date: new Date().toISOString().split('T')[0],
  siteName: '',
  indicator: '',
  value: '',
  notes: '',
};

export function EntryFormView() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const selectedUnit = formData.indicator ? units[formData.indicator] : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate OnSelect event for Power Apps
    const payload = {
      action: 'save',
      data: {
        ...formData,
        value: parseFloat(formData.value),
        unit: selectedUnit,
        status: 'draft',
        createdAt: new Date().toISOString(),
      },
    };

    console.log('OnSelect Event - Save:', payload);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Entry Saved',
        description: 'Your operational data entry has been saved as a draft.',
      });
      setFormData(initialFormData);
    }, 500);
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">New Data Entry</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter operational environmental data. All entries start as drafts.
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground">
                Date <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="pl-9 bg-secondary border-border"
                />
              </div>
            </div>

            {/* Site Selection */}
            <div className="space-y-2">
              <Label htmlFor="site" className="text-foreground">
                Site Name <span className="text-destructive">*</span>
              </Label>
              <Select
                required
                value={formData.siteName}
                onValueChange={(value) =>
                  setFormData({ ...formData, siteName: value })
                }
              >
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select a site" />
                </SelectTrigger>
                <SelectContent>
                  {siteNames.map((site) => (
                    <SelectItem key={site} value={site}>
                      {site}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Indicator Selection */}
            <div className="space-y-2">
              <Label htmlFor="indicator" className="text-foreground">
                Indicator <span className="text-destructive">*</span>
              </Label>
              <Select
                required
                value={formData.indicator}
                onValueChange={(value) =>
                  setFormData({ ...formData, indicator: value })
                }
              >
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select an indicator" />
                </SelectTrigger>
                <SelectContent>
                  {indicators.map((indicator) => (
                    <SelectItem key={indicator} value={indicator}>
                      {indicator}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Value */}
            <div className="space-y-2">
              <Label htmlFor="value" className="text-foreground">
                Value <span className="text-destructive">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="value"
                  type="number"
                  step="any"
                  required
                  placeholder="0.00"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                  className="bg-secondary border-border flex-1"
                />
                <div className="flex items-center justify-center min-w-[80px] rounded-md bg-muted px-3 text-sm text-muted-foreground">
                  {selectedUnit || 'Unit'}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-foreground">
                Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Add any relevant notes..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="bg-secondary border-border min-h-[100px]"
              />
            </div>
          </CardContent>

          <CardFooter className="flex gap-3 border-t border-border pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex-1"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Saving...' : 'Save as Draft'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
