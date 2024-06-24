// Assuming DetailCard component file

import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
                                          
export function DetailCard(props) {
  return (
    <Card className="">
      <CardHeader>
        {Array.isArray(props.images) && props.images.length > 0 ? (
          <div className="flex  flex-wrap -mx-2">
            {props.images.map((image, index) => (
              <div key={index} className="w-1/2 px-2 mb-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <img
                      alt={`Bike Image ${index + 1}`}
                      className="w-full h-32 object-cover cursor-pointer"
                      src={image}
                    />
                  </DialogTrigger>
                  <DialogContent className="mx-auto max-w-md p-4">
                    {/* Additional content if needed */}  
                    <img
                      alt={`Bike Image ${index + 1}`}
                      className="w-full h-auto object-cover"
                      src={image}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        ) : (
          <p>No images available</p>
        )}
      </CardHeader>
      <CardContent className="-mt-2">
        {/* Additional content if needed */}
      </CardContent>
      <CardFooter>
        {/* Additional footer content if needed */}
      </CardFooter>
    </Card>
  );
}
