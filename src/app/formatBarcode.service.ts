import { Injectable } from '@angular/core';

@Injectable()
export class FormatBarcodeService {
  data_format: any;
  constructor() {
    // console.log(this.data_format);

  }


  FormatTHtoEN(ev) {
    this.data_format = '';
    var barcode = ev;
    // console.log(ev);

    for (var i = 0; i < barcode.length; i++) {
      if (barcode[i] == 'ๅ' || barcode[i] == '+') {
        this.data_format = this.data_format + '1';
      } else {
        if (barcode[i] == '/' || barcode[i] == '๑') {
          this.data_format = this.data_format + '2';
        } else {
          if (barcode[i] == '-' || barcode[i] == '๒') {
            this.data_format = this.data_format + '3';
          } else {
            if (barcode[i] == 'ภ' || barcode[i] == '๓') {
              this.data_format = this.data_format + '4';
            } else {
              if (barcode[i] == 'ถ' || barcode[i] == '๔') {
                this.data_format = this.data_format + '5';
              } else {
                if (barcode[i] == 'ุ' || barcode[i] == 'ู') {
                  this.data_format = this.data_format + '6';
                } else {
                  if (barcode[i] == 'ึ' || barcode[i] == '฿') {
                    this.data_format = this.data_format + '7';
                  } else {
                    if (barcode[i] == 'ค' || barcode[i] == '๕') {
                      this.data_format = this.data_format + '8';
                    } else {
                      if (barcode[i] == 'ต' || barcode[i] == '๖') {
                        this.data_format = this.data_format + '9';
                      } else {
                        if (barcode[i] == 'จ' || barcode[i] == '๗') {
                          this.data_format = this.data_format + '0';
                        } else {
                          if (barcode[i] == 'ใ' || barcode[i] == 'ฬ') {
                            this.data_format = this.data_format + '.';
                          } else {
                            if (barcode[i] == 'ฟ' || barcode[i] == 'ฤ') {
                              this.data_format = this.data_format + 'A';
                            } else {
                              if (barcode[i] == 'ิ' || barcode[i] == 'ฺ') {
                                this.data_format = this.data_format + 'B';
                              } else {
                                if (barcode[i] == 'แ' || barcode[i] == 'ฉ') {
                                  this.data_format = this.data_format + 'C';
                                } else {
                                  if (barcode[i] == 'ก' || barcode[i] == 'ฏ') {
                                    this.data_format = this.data_format + 'D';
                                  } else {
                                    if (barcode[i] == 'ำ' || barcode[i] == 'ฎ') {
                                      this.data_format = this.data_format + 'E';
                                    } else {
                                      if (barcode[i] == 'ด' || barcode[i] == 'โ') {
                                        this.data_format = this.data_format + 'F';
                                      } else {
                                        if (barcode[i] == 'เ' || barcode[i] == 'ฌ') {
                                          this.data_format = this.data_format + 'G';
                                        } else {
                                          if (barcode[i] == '้' || barcode[i] == '็') {
                                            this.data_format = this.data_format + 'H';
                                          } else {
                                            if (barcode[i] == 'ร' || barcode[i] == 'ณ') {
                                              this.data_format = this.data_format + 'I';
                                            } else {
                                              if (barcode[i] == '่' || barcode[i] == '๋') {
                                                this.data_format = this.data_format + 'J';
                                              } else {
                                                if (barcode[i] == 'า' || barcode[i] == 'ษ') {
                                                  this.data_format = this.data_format + 'K';
                                                } else {
                                                  if (barcode[i] == 'ส' || barcode[i] == 'ศ') {
                                                    this.data_format = this.data_format + 'L';
                                                  } else {
                                                    if (barcode[i] == 'ท' || barcode[i] == '?') {
                                                      this.data_format = this.data_format + 'M';
                                                    } else {
                                                      if (barcode[i] == 'ื' || barcode[i] == '์') {
                                                        this.data_format = this.data_format + 'N';
                                                      } else {
                                                        if (barcode[i] == 'น' || barcode[i] == 'ฯ') {
                                                          this.data_format = this.data_format + 'O';
                                                        } else {
                                                          if (barcode[i] == 'ย' || barcode[i] == 'ญ') {
                                                            this.data_format = this.data_format + 'P';
                                                          } else {
                                                            if (barcode[i] == 'ๆ' || barcode[i] == '๐') {
                                                              this.data_format = this.data_format + 'Q';
                                                            } else {
                                                              if (barcode[i] == 'พ' || barcode[i] == 'ฑ') {
                                                                this.data_format = this.data_format + 'R';
                                                              } else {
                                                                if (barcode[i] == 'ห' || barcode[i] == 'ฆ') {
                                                                  this.data_format = this.data_format + 'S';
                                                                } else {
                                                                  if (barcode[i] == 'ะ' || barcode[i] == 'ธ') {
                                                                    this.data_format = this.data_format + 'T';
                                                                  } else {
                                                                    if (barcode[i] == 'ี' || barcode[i] == '๊') {
                                                                      this.data_format = this.data_format + 'U';
                                                                    } else {
                                                                      if (barcode[i] == 'อ' || barcode[i] == 'ฮ') {
                                                                        this.data_format = this.data_format + 'V';
                                                                      } else {
                                                                        if (barcode[i] == 'ไ' || barcode[i] == '"') {
                                                                          this.data_format = this.data_format + 'W';
                                                                        } else {
                                                                          if (barcode[i] == 'ป' || barcode[i] == ')') {
                                                                            this.data_format = this.data_format + 'X';
                                                                          } else {
                                                                            if (barcode[i] == 'ั' || barcode[i] == 'ํ') {
                                                                              this.data_format = this.data_format + 'Y';
                                                                            } else {
                                                                              if (barcode[i] == 'ผ' || barcode[i] == '(') {
                                                                                this.data_format = this.data_format + 'Z';
                                                                              } else {
                                                                                this.data_format = barcode;
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

  }

}
