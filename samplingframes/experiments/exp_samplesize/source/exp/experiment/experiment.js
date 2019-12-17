jsPsych.data.addProperties({
  "subj_id": jsPsych.randomization.sampleWithoutReplacement([100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120], 1),
  "condition_number": jsPsych.randomization.sampleWithoutReplacement([1,2], 1)
});

var timeline = {
  "timeline": [
    {
      "type": ["html-keyboard-response"],
      "stimulus": ["Welcome to the experiment! Press any key to begin"],
      "choices": jsPsych.ANY_KEY,
      "response_ends_trial": true,
      "post_trial_gap": [0]
    },
    {
      "timeline": [
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["image-button-response"],
                      "stimulus": jsPsych.timelineVariable('instruction_files'),
                      "stimulus_height": [400],
                      "maintain_aspect_ratio": true,
                      "choices": ["Next"],
                      "margin_vertical": ["0px"],
                      "margin_horizontal": ["8px"],
                      "response_ends_trial": true,
                      "post_trial_gap": [200]
                    }
                  ],
                  "timeline_variables": [
                    {
                      "instruction_files": ["resource/image/robot1_category.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot2_category.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot3_category.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot4_category.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot5_category.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot6_category.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot7_category.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot8_category.jpg"]
                    }
                  ]
                },
                {
                  "type": ["survey-multi-choice"],
                  "questions": [
                    {
                      "prompt": ["What is true about the size of the Sodor spheres?"],
                      "options": ["They come in a variety of sizes", "They are all small", "They are all large"],
                      "horizontal": false,
                      "required": false,
                      "name": ["sizeQ"]
                    },
                    {
                      "prompt": ["Does the probe transmit data about any sphere it encounters?"],
                      "options": ["Yes, it transmits all data", "No, it only transmits some"],
                      "horizontal": false,
                      "required": false,
                      "name": ["dataQ"]
                    }
                  ],
                  "randomize_question_order": false,
                  "preamble": ["Check your understanding!<BR> If you get any wrong you will have to read the instructions again."],
                  "button_label": ["Continue"],
                  "required_message": ["You must choose at least one response for this question"],
                  "post_trial_gap": [0]
                },
                {
                  "timeline": [
                    {
                      "type": ["html-keyboard-response"],
                      "stimulus": ["Sorry, at least one of your responses was wrong. Press any key to see the instructions again."],
                      "choices": jsPsych.ANY_KEY,
                      "response_ends_trial": true,
                      "post_trial_gap": [0]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.responses != "{\"sizeQ\":\"They come in a variety of sizes\",\"dataQ\":\"No, it only transmits some\"}"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "loop_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.responses != "{\"sizeQ\":\"They come in a variety of sizes\",\"dataQ\":\"No, it only transmits some\"}"){
        return true;
      } else {
        return false;
      }
    }
            },
            {
              "type": ["html-keyboard-response"],
              "stimulus": ["Well done! Press any key to start the experiment."],
              "choices": jsPsych.ANY_KEY,
              "response_ends_trial": true,
              "post_trial_gap": [0]
            }
          ]
        },
        {
          "timeline": [
            {
              "type": ["image-button-response"],
              "stimulus": jsPsych.timelineVariable('start_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "choices": ["Next"],
              "margin_vertical": ["0px"],
              "margin_horizontal": ["8px"],
              "response_ends_trial": true,
              "post_trial_gap": [200]
            }
          ],
          "timeline_variables": [
            {
              "start_files": ["resource/image/dataX1_category.jpg"]
            },
            {
              "start_files": ["resource/image/dataX2_category.jpg"]
            }
          ]
        },
        {
          "timeline": [
            {
              "type": ["image-button-response"],
              "stimulus": jsPsych.timelineVariable('train1_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "choices": ["Next"],
              "margin_vertical": ["0px"],
              "margin_horizontal": ["8px"],
              "response_ends_trial": true,
              "post_trial_gap": [200]
            }
          ],
          "timeline_variables": [
            {
              "train1_files": ["resource/image/data1_category.jpg"]
            },
            {
              "train1_files": ["resource/image/data2_category.jpg"]
            }
          ]
        },
        {
          "type": ["image-button-response"],
          "stimulus": ["resource/image/interimA_category.jpg"],
          "stimulus_height": [200],
          "maintain_aspect_ratio": true,
          "choices": ["Next"],
          "margin_vertical": ["0px"],
          "margin_horizontal": ["8px"],
          "response_ends_trial": true,
          "post_trial_gap": [200]
        },
        {
          "timeline": [
            {
              "type": ["image-slider-response"],
              "stimulus": jsPsych.timelineVariable('test_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "labels": ["Definitely does not", "", "", "", "", "", "", "", "", "Definitely does"],
              "button_label": ["Continue"],
              "min": [1],
              "max": [10],
              "start": [5],
              "step": [1],
              "slider_width": [350],
              "require_movement": true,
              "prompt": ["In your opinion, how likely is it that a sphere of this size has a plaxium coating? "],
              "response_ends_trial": true,
              "post_trial_gap": [200],
              "data": {test_item : jsPsych.timelineVariable('test_files')}
            }
          ],
          "timeline_variables": [
            {
              "test_files": ["resource/image/test1.jpg"]
            },
            {
              "test_files": ["resource/image/test2.jpg"]
            },
            {
              "test_files": ["resource/image/test3.jpg"]
            },
            {
              "test_files": ["resource/image/test4.jpg"]
            },
            {
              "test_files": ["resource/image/test5.jpg"]
            },
            {
              "test_files": ["resource/image/test6.jpg"]
            },
            {
              "test_files": ["resource/image/test7.jpg"]
            },
            {
              "test_files": ["resource/image/test8.jpg"]
            }
          ],
          "randomize_order": [true]
        },
        {
          "type": ["image-button-response"],
          "stimulus": ["resource/other/interimB_category.jpeg"],
          "stimulus_height": [200],
          "maintain_aspect_ratio": true,
          "choices": ["Next"],
          "margin_vertical": ["0px"],
          "margin_horizontal": ["8px"],
          "response_ends_trial": true,
          "post_trial_gap": [200]
        },
        {
          "timeline": [
            {
              "type": ["image-button-response"],
              "stimulus": jsPsych.timelineVariable('train2_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "choices": ["Next"],
              "margin_vertical": ["0px"],
              "margin_horizontal": ["8px"],
              "response_ends_trial": true,
              "post_trial_gap": [200]
            }
          ],
          "timeline_variables": [
            {
              "train2_files": ["resource/image/data3_category.jpg"]
            },
            {
              "train2_files": ["resource/image/data4_category.jpg"]
            },
            {
              "train2_files": ["resource/image/data5_category.jpg"]
            },
            {
              "train2_files": ["resource/image/data6_category.jpg"]
            }
          ]
        },
        {
          "type": ["image-button-response"],
          "stimulus": ["resource/image/interimA_category.jpg"],
          "stimulus_height": [200],
          "maintain_aspect_ratio": true,
          "choices": ["Next"],
          "margin_vertical": ["0px"],
          "margin_horizontal": ["8px"],
          "response_ends_trial": true,
          "post_trial_gap": [200]
        },
        {
          "timeline": [
            {
              "type": ["image-slider-response"],
              "stimulus": jsPsych.timelineVariable('test_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "labels": ["Definitely does not", "", "", "", "", "", "", "", "", "Definitely does"],
              "button_label": ["Continue"],
              "min": [1],
              "max": [10],
              "start": [5],
              "step": [1],
              "slider_width": [350],
              "require_movement": true,
              "prompt": ["In your opinion, how likely is it that a sphere of this size has a plaxium coating? "],
              "response_ends_trial": true,
              "post_trial_gap": [200],
              "data": {test_item : jsPsych.timelineVariable('test_files')}
            }
          ],
          "timeline_variables": [
            {
              "test_files": ["resource/image/test1.jpg"]
            },
            {
              "test_files": ["resource/image/test2.jpg"]
            },
            {
              "test_files": ["resource/image/test3.jpg"]
            },
            {
              "test_files": ["resource/image/test4.jpg"]
            },
            {
              "test_files": ["resource/image/test5.jpg"]
            },
            {
              "test_files": ["resource/image/test6.jpg"]
            },
            {
              "test_files": ["resource/image/test7.jpg"]
            },
            {
              "test_files": ["resource/image/test8.jpg"]
            }
          ],
          "randomize_order": [true]
        },
        {
          "type": ["image-button-response"],
          "stimulus": ["resource/other/interimB_category.jpeg"],
          "stimulus_height": [200],
          "maintain_aspect_ratio": true,
          "choices": ["Next"],
          "margin_vertical": ["0px"],
          "margin_horizontal": ["8px"],
          "response_ends_trial": true,
          "post_trial_gap": [200]
        },
        {
          "timeline": [
            {
              "type": ["image-button-response"],
              "stimulus": jsPsych.timelineVariable('train3_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "choices": ["Next"],
              "margin_vertical": ["0px"],
              "margin_horizontal": ["8px"],
              "response_ends_trial": true,
              "post_trial_gap": [200]
            }
          ],
          "timeline_variables": [
            {
              "train3_files": ["resource/image/data1b_category.jpg"]
            },
            {
              "train3_files": ["resource/image/data2b_category.jpg"]
            },
            {
              "train3_files": ["resource/image/data3b_category.jpg"]
            },
            {
              "train3_files": ["resource/image/data4b_category.jpg"]
            },
            {
              "train3_files": ["resource/image/data5b_category.jpg"]
            },
            {
              "train3_files": ["resource/image/data6b_category.jpg"]
            }
          ]
        },
        {
          "type": ["image-button-response"],
          "stimulus": ["resource/image/interimA_category.jpg"],
          "stimulus_height": [200],
          "maintain_aspect_ratio": true,
          "choices": ["Next"],
          "margin_vertical": ["0px"],
          "margin_horizontal": ["8px"],
          "response_ends_trial": true,
          "post_trial_gap": [200]
        },
        {
          "timeline": [
            {
              "type": ["image-slider-response"],
              "stimulus": jsPsych.timelineVariable('test_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "labels": ["Definitely does not", "", "", "", "", "", "", "", "", "Definitely does"],
              "button_label": ["Continue"],
              "min": [1],
              "max": [10],
              "start": [5],
              "step": [1],
              "slider_width": [350],
              "require_movement": true,
              "prompt": ["In your opinion, how likely is it that a sphere of this size has a plaxium coating? "],
              "response_ends_trial": true,
              "post_trial_gap": [200],
              "data": {test_item : jsPsych.timelineVariable('test_files')}
            }
          ],
          "timeline_variables": [
            {
              "test_files": ["resource/image/test1.jpg"]
            },
            {
              "test_files": ["resource/image/test2.jpg"]
            },
            {
              "test_files": ["resource/image/test3.jpg"]
            },
            {
              "test_files": ["resource/image/test4.jpg"]
            },
            {
              "test_files": ["resource/image/test5.jpg"]
            },
            {
              "test_files": ["resource/image/test6.jpg"]
            },
            {
              "test_files": ["resource/image/test7.jpg"]
            },
            {
              "test_files": ["resource/image/test8.jpg"]
            }
          ],
          "randomize_order": [true]
        },
        {
          "type": ["html-keyboard-response"],
          "stimulus": ["All done! Your HIT code is 469269.<BR>Thank you for participating in our experiment! Please press any key to end."],
          "choices": jsPsych.ANY_KEY,
          "response_ends_trial": true,
          "post_trial_gap": [0]
        }
      ],
      "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.condition_number == "1"){
        return true;
      } else {
        return false;
      }
    }
    },
    {
      "timeline": [
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["image-button-response"],
                      "stimulus": jsPsych.timelineVariable('instruction_files'),
                      "stimulus_height": [400],
                      "maintain_aspect_ratio": true,
                      "choices": ["Next"],
                      "margin_vertical": ["0px"],
                      "margin_horizontal": ["8px"],
                      "response_ends_trial": true,
                      "post_trial_gap": [200]
                    }
                  ],
                  "timeline_variables": [
                    {
                      "instruction_files": ["resource/image/robot1_property.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot2_property.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot3_property.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot4_property.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot5_property.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot6_property.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot7_property.jpg"]
                    },
                    {
                      "instruction_files": ["resource/image/robot8_property.jpg"]
                    }
                  ]
                },
                {
                  "type": ["survey-multi-choice"],
                  "questions": [
                    {
                      "prompt": ["What is true about the size of the Sodor spheres?"],
                      "options": ["They come in a variety of sizes", "They are all small", "They are all large"],
                      "horizontal": false,
                      "required": false,
                      "name": ["sizeQ"]
                    },
                    {
                      "prompt": ["Does the probe transmit data about any sphere it encounters?"],
                      "options": ["Yes, it transmits all data", "No, it only transmits some"],
                      "horizontal": false,
                      "required": false,
                      "name": ["dataQ"]
                    }
                  ],
                  "randomize_question_order": false,
                  "preamble": ["Check your understanding!<BR> If you get any wrong you will have to read the instructions again."],
                  "button_label": ["Continue"],
                  "required_message": ["You must choose at least one response for this question"],
                  "post_trial_gap": [0]
                },
                {
                  "timeline": [
                    {
                      "type": ["html-keyboard-response"],
                      "stimulus": ["Sorry, at least one of your responses was wrong. Press any key to see the instructions again."],
                      "choices": jsPsych.ANY_KEY,
                      "response_ends_trial": true,
                      "post_trial_gap": [0]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.responses != "{\"sizeQ\":\"They come in a variety of sizes\",\"dataQ\":\"No, it only transmits some\"}"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "loop_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.responses != "{\"sizeQ\":\"They come in a variety of sizes\",\"dataQ\":\"No, it only transmits some\"}"){
        return true;
      } else {
        return false;
      }
    }
            },
            {
              "type": ["html-keyboard-response"],
              "stimulus": ["Well done! Press any key to start the experiment."],
              "choices": jsPsych.ANY_KEY,
              "response_ends_trial": true,
              "post_trial_gap": [0]
            }
          ]
        },
        {
          "timeline": [
            {
              "type": ["image-button-response"],
              "stimulus": jsPsych.timelineVariable('start_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "choices": ["Next"],
              "margin_vertical": ["0px"],
              "margin_horizontal": ["8px"],
              "response_ends_trial": true,
              "post_trial_gap": [200]
            }
          ],
          "timeline_variables": [
            {
              "start_files": ["resource/image/dataX1_property.jpg"]
            },
            {
              "start_files": ["resource/image/dataX2_property.jpg"]
            }
          ]
        },
        {
          "timeline": [
            {
              "type": ["image-button-response"],
              "stimulus": jsPsych.timelineVariable('train1_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "choices": ["Next"],
              "margin_vertical": ["0px"],
              "margin_horizontal": ["8px"],
              "response_ends_trial": true,
              "post_trial_gap": [200]
            }
          ],
          "timeline_variables": [
            {
              "train1_files": ["resource/image/data1_property.jpg"]
            },
            {
              "train1_files": ["resource/image/data2_property.jpg"]
            }
          ]
        },
        {
          "type": ["image-button-response"],
          "stimulus": ["resource/image/interimA_property.jpg"],
          "stimulus_height": [200],
          "maintain_aspect_ratio": true,
          "choices": ["Next"],
          "margin_vertical": ["0px"],
          "margin_horizontal": ["8px"],
          "response_ends_trial": true,
          "post_trial_gap": [200]
        },
        {
          "timeline": [
            {
              "type": ["image-slider-response"],
              "stimulus": jsPsych.timelineVariable('test_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "labels": ["Definitely does not", "", "", "", "", "", "", "", "", "Definitely does"],
              "button_label": ["Continue"],
              "min": [1],
              "max": [10],
              "start": [5],
              "step": [1],
              "slider_width": [350],
              "require_movement": true,
              "prompt": ["In your opinion, how likely is it that a sphere of this size has a plaxium coating? "],
              "response_ends_trial": true,
              "post_trial_gap": [200],
              "data": {test_item : jsPsych.timelineVariable('test_files')}
            }
          ],
          "timeline_variables": [
            {
              "test_files": ["resource/image/test1.jpg"]
            },
            {
              "test_files": ["resource/image/test2.jpg"]
            },
            {
              "test_files": ["resource/image/test3.jpg"]
            },
            {
              "test_files": ["resource/image/test4.jpg"]
            },
            {
              "test_files": ["resource/image/test5.jpg"]
            },
            {
              "test_files": ["resource/image/test6.jpg"]
            },
            {
              "test_files": ["resource/image/test7.jpg"]
            },
            {
              "test_files": ["resource/image/test8.jpg"]
            }
          ],
          "randomize_order": [true]
        },
        {
          "type": ["image-button-response"],
          "stimulus": ["resource/other/interimB_property.jpeg"],
          "stimulus_height": [200],
          "maintain_aspect_ratio": true,
          "choices": ["Next"],
          "margin_vertical": ["0px"],
          "margin_horizontal": ["8px"],
          "response_ends_trial": true,
          "post_trial_gap": [200]
        },
        {
          "timeline": [
            {
              "type": ["image-button-response"],
              "stimulus": jsPsych.timelineVariable('train2_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "choices": ["Next"],
              "margin_vertical": ["0px"],
              "margin_horizontal": ["8px"],
              "response_ends_trial": true,
              "post_trial_gap": [200]
            }
          ],
          "timeline_variables": [
            {
              "train2_files": ["resource/image/data3_property.jpg"]
            },
            {
              "train2_files": ["resource/image/data4_property.jpg"]
            },
            {
              "train2_files": ["resource/image/data5_property.jpg"]
            },
            {
              "train2_files": ["resource/image/data6_property.jpg"]
            }
          ]
        },
        {
          "type": ["image-button-response"],
          "stimulus": ["resource/image/interimA_property.jpg"],
          "stimulus_height": [200],
          "maintain_aspect_ratio": true,
          "choices": ["Next"],
          "margin_vertical": ["0px"],
          "margin_horizontal": ["8px"],
          "response_ends_trial": true,
          "post_trial_gap": [200]
        },
        {
          "timeline": [
            {
              "type": ["image-slider-response"],
              "stimulus": jsPsych.timelineVariable('test_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "labels": ["Definitely does not", "", "", "", "", "", "", "", "", "Definitely does"],
              "button_label": ["Continue"],
              "min": [1],
              "max": [10],
              "start": [5],
              "step": [1],
              "slider_width": [350],
              "require_movement": true,
              "prompt": ["In your opinion, how likely is it that a sphere of this size has a plaxium coating? "],
              "response_ends_trial": true,
              "post_trial_gap": [200],
              "data": {test_item : jsPsych.timelineVariable('test_files')}
            }
          ],
          "timeline_variables": [
            {
              "test_files": ["resource/image/test1.jpg"]
            },
            {
              "test_files": ["resource/image/test2.jpg"]
            },
            {
              "test_files": ["resource/image/test3.jpg"]
            },
            {
              "test_files": ["resource/image/test4.jpg"]
            },
            {
              "test_files": ["resource/image/test5.jpg"]
            },
            {
              "test_files": ["resource/image/test6.jpg"]
            },
            {
              "test_files": ["resource/image/test7.jpg"]
            },
            {
              "test_files": ["resource/image/test8.jpg"]
            }
          ],
          "randomize_order": [true]
        },
        {
          "type": ["image-button-response"],
          "stimulus": ["resource/other/interimB_property.jpeg"],
          "stimulus_height": [200],
          "maintain_aspect_ratio": true,
          "choices": ["Next"],
          "margin_vertical": ["0px"],
          "margin_horizontal": ["8px"],
          "response_ends_trial": true,
          "post_trial_gap": [200]
        },
        {
          "timeline": [
            {
              "type": ["image-button-response"],
              "stimulus": jsPsych.timelineVariable('train3_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "choices": ["Next"],
              "margin_vertical": ["0px"],
              "margin_horizontal": ["8px"],
              "response_ends_trial": true,
              "post_trial_gap": [200]
            }
          ],
          "timeline_variables": [
            {
              "train3_files": ["resource/image/data1b_property.jpg"]
            },
            {
              "train3_files": ["resource/image/data2b_property.jpg"]
            },
            {
              "train3_files": ["resource/image/data3b_property.jpg"]
            },
            {
              "train3_files": ["resource/image/data4b_property.jpg"]
            },
            {
              "train3_files": ["resource/image/data5b_property.jpg"]
            },
            {
              "train3_files": ["resource/image/data6b_property.jpg"]
            }
          ]
        },
        {
          "type": ["image-button-response"],
          "stimulus": ["resource/image/interimA_property.jpg"],
          "stimulus_height": [200],
          "maintain_aspect_ratio": true,
          "choices": ["Next"],
          "margin_vertical": ["0px"],
          "margin_horizontal": ["8px"],
          "response_ends_trial": true,
          "post_trial_gap": [200]
        },
        {
          "timeline": [
            {
              "type": ["image-slider-response"],
              "stimulus": jsPsych.timelineVariable('test_files'),
              "stimulus_height": [200],
              "maintain_aspect_ratio": true,
              "labels": ["Definitely does not", "", "", "", "", "", "", "", "", "Definitely does"],
              "button_label": ["Continue"],
              "min": [1],
              "max": [10],
              "start": [5],
              "step": [1],
              "slider_width": [350],
              "require_movement": true,
              "prompt": ["In your opinion, how likely is it that a sphere of this size has a plaxium coating? "],
              "response_ends_trial": true,
              "post_trial_gap": [200],
              "data": {test_item : jsPsych.timelineVariable('test_files')}
            }
          ],
          "timeline_variables": [
            {
              "test_files": ["resource/image/test1.jpg"]
            },
            {
              "test_files": ["resource/image/test2.jpg"]
            },
            {
              "test_files": ["resource/image/test3.jpg"]
            },
            {
              "test_files": ["resource/image/test4.jpg"]
            },
            {
              "test_files": ["resource/image/test5.jpg"]
            },
            {
              "test_files": ["resource/image/test6.jpg"]
            },
            {
              "test_files": ["resource/image/test7.jpg"]
            },
            {
              "test_files": ["resource/image/test8.jpg"]
            }
          ],
          "randomize_order": [true]
        },
        {
          "type": ["html-keyboard-response"],
          "stimulus": ["All done! Your HIT code is 469269.<BR>Thank you for participating in our experiment! Please press any key to end."],
          "choices": jsPsych.ANY_KEY,
          "response_ends_trial": true,
          "post_trial_gap": [0]
        }
      ],
      "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.condition_number == "2"){
        return true;
      } else {
        return false;
      }
    }
    }
  ]
};

jsPsych.init(
{
  "timeline": [timeline],
  "on_finish": function() {
      $.post('submit',{"content": jsPsych.data.get().csv()})
    }
}
);
