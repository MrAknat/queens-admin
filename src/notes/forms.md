### The form I liked:

```

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-4 w-4 text-primary" />
              <h4 className="font-medium">Vehicle Information</h4>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vin">VIN *</Label>
                <Input
                  id="vin"
                  {...register("vin", { 
                    required: "VIN is required",
                    pattern: {
                      value: /^[A-HJ-NPR-Z0-9]{17}$/,
                      message: "VIN must be 17 characters"
                    }
                  })}
                  placeholder="Enter 17-character VIN"
                  className={errors.vin ? "border-red-500" : ""}
                />
                {errors.vin && (
                  <p className="text-sm text-red-500">{errors.vin.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="registration">Registration *</Label>
                <Input
                  id="registration"
                  {...register("registration", { required: "Registration is required" })}
                  placeholder="Enter registration number"
                  className={errors.registration ? "border-red-500" : ""}
                />
                {errors.registration && (
                  <p className="text-sm text-red-500">{errors.registration.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Input
                  id="make"
                  {...register("make", { required: "Make is required" })}
                  placeholder="e.g. Toyota, BMW, Ford"
                  className={errors.make ? "border-red-500" : ""}
                />
                {errors.make && (
                  <p className="text-sm text-red-500">{errors.make.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  {...register("model", { required: "Model is required" })}
                  placeholder="e.g. Camry, X5, F-150"
                  className={errors.model ? "border-red-500" : ""}
                />
                {errors.model && (
                  <p className="text-sm text-red-500">{errors.model.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  {...register("year", { 
                    required: "Year is required",
                    min: { value: 1900, message: "Year must be after 1900" },
                    max: { value: new Date().getFullYear() + 1, message: "Year cannot be in the future" }
                  })}
                  placeholder="e.g. 2020"
                  className={errors.year ? "border-red-500" : ""}
                />
                {errors.year && (
                  <p className="text-sm text-red-500">{errors.year.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="odometer">Odometer (km) *</Label>
                <Input
                  id="odometer"
                  type="number"
                  {...register("odometer", { 
                    required: "Odometer reading is required",
                    min: { value: 0, message: "Odometer cannot be negative" }
                  })}
                  placeholder="Enter kilometers"
                  className={errors.odometer ? "border-red-500" : ""}
                />
                {errors.odometer && (
                  <p className="text-sm text-red-500">{errors.odometer.message}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Appraisal Values Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-4 w-4 text-green-600" />
              <h4 className="font-medium">Appraisal Values</h4>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedRetail">Estimated Retail (AUD) *</Label>
                <Input
                  id="estimatedRetail"
                  type="number"
                  step="0.01"
                  {...register("estimatedRetail", { 
                    required: "Estimated retail value is required",
                    min: { value: 0, message: "Value cannot be negative" }
                  })}
                  placeholder="0.00"
                  className={errors.estimatedRetail ? "border-red-500" : ""}
                />
                {errors.estimatedRetail && (
                  <p className="text-sm text-red-500">{errors.estimatedRetail.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tradeInValue">Trade-in Value (AUD) *</Label>
                <Input
                  id="tradeInValue"
                  type="number"
                  step="0.01"
                  {...register("tradeInValue", { 
                    required: "Trade-in value is required",
                    min: { value: 0, message: "Value cannot be negative" }
                  })}
                  placeholder="0.00"
                  className={errors.tradeInValue ? "border-red-500" : ""}
                />
                {errors.tradeInValue && (
                  <p className="text-sm text-red-500">{errors.tradeInValue.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="wholesaleValue">Wholesale Value (AUD)</Label>
                <Input
                  id="wholesaleValue"
                  type="number"
                  step="0.01"
                  {...register("wholesaleValue", { 
                    min: { value: 0, message: "Value cannot be negative" }
                  })}
                  placeholder="0.00"
                  className={errors.wholesaleValue ? "border-red-500" : ""}
                />
                {errors.wholesaleValue && (
                  <p className="text-sm text-red-500">{errors.wholesaleValue.message}</p>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="condition">Vehicle Condition *</Label>
              <select
                id="condition"
                {...register("condition", { required: "Vehicle condition is required" })}
                className={`w-full px-3 py-2 border rounded-md bg-background ${
                  errors.condition ? "border-red-500" : "border-input"
                }`}
              >
                <option value="">Select condition</option>
                <option value="excellent">Excellent</option>
                <option value="very-good">Very Good</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
              {errors.condition && (
                <p className="text-sm text-red-500">{errors.condition.message}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Additional Information Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-blue-600" />
              <h4 className="font-medium">Additional Information</h4>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appraiserName">Appraiser Name *</Label>
                <Input
                  id="appraiserName"
                  {...register("appraiserName", { required: "Appraiser name is required" })}
                  placeholder="Enter your name"
                  className={errors.appraiserName ? "border-red-500" : ""}
                />
                {errors.appraiserName && (
                  <p className="text-sm text-red-500">{errors.appraiserName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="appraisalDate">Appraisal Date *</Label>
                <Input
                  id="appraisalDate"
                  type="date"
                  {...register("appraisalDate", { required: "Appraisal date is required" })}
                  className={errors.appraisalDate ? "border-red-500" : ""}
                />
                {errors.appraisalDate && (
                  <p className="text-sm text-red-500">{errors.appraisalDate.message}</p>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="notes">Notes & Observations</Label>
              <textarea
                id="notes"
                {...register("notes")}
                rows={4}
                placeholder="Enter any additional notes, observations, or special considerations..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              disabled={!isValid || isSubmitting}
              className="flex items-center gap-2 min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Appraisal
                </>
              )}
            </Button>
          </div>
        </form>
```
