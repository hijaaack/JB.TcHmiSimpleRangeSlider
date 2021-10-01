# JB.TcHmiSimpleRangeSlider for TwinCAT HMI

Simple range slider control with step size that uses the [ui-range](https://github.com/yairEO/ui-range)

![Slider Control](https://user-images.githubusercontent.com/75740551/135626987-6c0f7e8c-4280-4f22-80f4-41218014a2a9.png)
![Changing Value on the control](https://user-images.githubusercontent.com/75740551/135626993-8a434259-d8dc-4bac-9a5e-fd5140d0fe7c.png)
![Step size active](https://user-images.githubusercontent.com/75740551/135627000-eb2a9e6d-e7a8-4808-a0f4-86275a1a8d0e.png)

# Installation
Easiest way to install this package is inside your TwinCAT HMI Project. 
**Right click** References and click "Manage NuGet Packages.." then browse for the file and install it! 
![enter image description here](https://user-images.githubusercontent.com/75740551/101645035-32cef100-3a36-11eb-88f4-eeaccd3366d6.png)

# Configuration
When you bind your symbol to the control. Make sure the databinding is **TwoWay** so the control can change the value of the binding.

To change the binding mode, **Right Click** the symbol and chose **Edit symbol..**
![RangeSlider properties](https://user-images.githubusercontent.com/75740551/135626922-6ed07e8a-8ddc-4391-94ab-90c07fce6750.png)

The control also have a custom event that fires on change.
![RangeSlider properties](https://user-images.githubusercontent.com/75740551/135626975-d7ded869-401f-443f-b5cb-e6b3bcbab13f.png)
