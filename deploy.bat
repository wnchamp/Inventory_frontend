rmdir /s /q \\10.50.41.20\inventory\Frontend
xcopy /e /i /v /h /k /y dist \\10.50.41.20\inventory\Frontend
rmdir /s /q dist
start http://10.50.41.20/

REM rmdir /s /q \\10.50.41.18\inventory\Frontend
REM xcopy /e /i /v /h /k /y dist \\10.50.41.18\inventory\Frontend
REM rmdir /s /q dist
REM start http://10.50.18.20/