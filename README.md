# Kelime Oyunu
Kelime oyunu bilgisayara karşı en son söylenen kelimenin son harfinden yeni kelime türetme oyunudur. Oyun sesli komutlarla oynandığı için mikrofon kullanımı zorunludur.

# Nasıl çalıştırılır
Öncelikle kurulum için alttaki komut satırı çalıştırılmalıdır.
```bash
yarn install
```
Daha sonra alttaki komut satırı ile projeyi çalıştırabilirsiniz.
```bash
yarn start
```
İlk açılan ekrandan mikrofon izni verilmesi gerekir.
![Screenshot 2022-03-30 105618](https://user-images.githubusercontent.com/65852838/160781139-2e99d7e8-db3a-48e4-a5ef-9d1da19b3feb.png)

Ardından hangi tarafın önce başlayacağı seçilerek oyuna başlanabilir.
![Screenshot 2022-03-30 105750](https://user-images.githubusercontent.com/65852838/160781439-c2f70fa6-d682-44d9-a6e1-ca87fd08df2c.png)

# Kullanılan Teknolojiler
* Webkit speech recognition
* Webkit speech syntesis
* @mui/material
* @mui/icons-material
