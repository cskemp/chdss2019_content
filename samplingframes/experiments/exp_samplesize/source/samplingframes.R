library(jaysire)
set.seed(143)

# ----------- setup -----------

# set the directory for the experiment, and delete old experiment builds in it
my_directory <- file.path("exp")
if(dir.exists(my_directory)) {
  unlink(my_directory, recursive = TRUE)
}

# set height and width of stimuli
stim_height <- 200
stim_width <- 350

# completion code is a random number between 10000 and 1000000
hit_code <- sample(x = 10000:1000000, size = 1)

# specify the location of the resource folder (i.e., our image files)
resource_folder <- file.path("img")

# the structure of the timeline is the same in both conditions, 
# but relies on different files; so what we'll do is wrap everything 
# in one very big function that takes the condition name as input...

experiment_timeline <- function(condition) {
  
  # helper function that lists files matching a  prefix and condition:
  files_matching <- function(prefix, condition) {
    return(list.files(resource_folder, pattern = paste0(prefix, condition, "*")))
  }
  
  # construct a list that contains paths to the files for this condition
  files <- list(
    instr_files    = files_matching("robot[1-9]_", condition),
    instr_success  = files_matching("instructionsuccess_", condition),
    start_files    = files_matching("dataX[1-2]_", condition),
    train1_files   = files_matching("data[1-2]_", condition),
    train2_files   = files_matching("data[3-6]_", condition),
    train3_files   = files_matching("data[1-6]b_", condition),
    interimA_files = files_matching("interimA_", condition),
    interimB_files = files_matching("interimB_", condition)
  )
  
  # the test files are the same in both conditions
  test_files <- list.files(resource_folder, pattern = "test[1-8].jpg")
  
  
  # ----------- instructions -----------
  
  # trial structure
  instructions <- trial_image_button_response(
    stimulus = insert_variable(name = "instruction_files"),
    stimulus_height = stim_height * 2,
    maintain_aspect_ratio = TRUE,
    choices = c("Next"),
    post_trial_gap = 200
  )
  
  # timeline
  instr_init <- build_timeline(instructions) %>%
    tl_add_variables(instruction_files = insert_resource(files$instr_files))
  
  
  # ----------- instruction checks -----------
  
  # trial structure with two check questions
  qs <- list(
    question_multi(
      prompt = "What is true about the size of the Sodor spheres?",
      options = c("They come in a variety of sizes",
                  "They are all small",
                  "They are all large"),
      name = "sizeQ"
    ),
    question_multi(
      prompt = "Does the probe transmit data about any sphere it encounters?",
      options = c("Yes, it transmits all data",
                  "No, it only transmits some"
      ),
      name = "dataQ"
    )
  )
  
  instr_qs <- trial_survey_multi_choice(
    preamble = "Check your understanding!<BR> If you get any wrong you will have to read the instructions again.",
    questions = qs
  )
  
  # this inserts a javascript function into the experiment code that returns "false" if 
  # both instruction check questions were answered correctly, "true" otherwise
  answer_wrong <- fn_data_condition(
    responses != '{"sizeQ":"They come in a variety of sizes","dataQ":"No, it only transmits some"}' 
  )
  
  # template for the "sorry" screen ...
  instr_sorry <- trial_html_keyboard_response(
    stimulus = "Sorry, at least one of your responses was wrong. Press any key to see the instructions again.",
    choices = respond_any_key()
  ) 
  
  # ... but it should only be included if the answers were wrong
  instr_sorry <- instr_sorry %>% 
    build_timeline() %>% 
    tl_display_if(answer_wrong)
  
  # now build a complete timeline for the instruction set, including the sorry
  # screen (which appears only if answers are wrong)...
  instr_trials <- build_timeline(instr_init, instr_qs, instr_sorry)
  
  # ... and wrap it in a loop that repeatedly executes until the check questions
  # are answered correctly:
  instr_trials <- instr_trials %>% tl_display_while(answer_wrong)
  
  # success screen when they make it through the instructions
  instr_yay <- trial_html_keyboard_response(
    stimulus = "Well done! Press any key to start the experiment.",
    choices = respond_any_key()
  )
  
  # the complete instruction set:
  instr <- build_timeline(instr_trials, instr_yay)

    
  # ----------- starting message -----------
  
  # trial structure
  start <- trial_image_button_response(
    stimulus = insert_variable(name = "start_files"),
    stimulus_height = stim_height,
    maintain_aspect_ratio = TRUE,
    #stimulus_width = stim_width,
    choices = c("Next"),
    post_trial_gap = 200
  )
  
  # timeline
  start_trials <- build_timeline(start) %>%
    tl_add_variables(start_files = insert_resource(files$start_files))

    
  # ----------- training trials -----------
  
  # first two trials
  train1 <- trial_image_button_response(
    stimulus = insert_variable(name = "train1_files"),
    stimulus_height = stim_height,
    maintain_aspect_ratio = TRUE,
    choices = c("Next"),
    post_trial_gap = 200
  )
  
  train1_trials <- build_timeline(train1) %>%
    tl_add_variables(train1_files = insert_resource(files$train1_files))
  
  # next four trials
  train2 <- trial_image_button_response(
    stimulus = insert_variable(name = "train2_files"),
    stimulus_height = stim_height,
    maintain_aspect_ratio = TRUE,
    choices = c("Next"),
    post_trial_gap = 200
  )
  
  train2_trials <- build_timeline(train2) %>%
    tl_add_variables(train2_files = insert_resource(files$train2_files))
  
  # last six trials
  train3 <- trial_image_button_response(
    stimulus = insert_variable(name = "train3_files"),
    stimulus_height = stim_height,
    maintain_aspect_ratio = TRUE,
    choices = c("Next"),
    post_trial_gap = 200
  )
  
  train3_trials <- build_timeline(train3) %>%
    tl_add_variables(train3_files = insert_resource(files$train3_files))
  
  
  # ----------- interim files  -----------
  
  # trial structure
  interimA <- trial_image_button_response(
    stimulus = insert_resource(files$interimA_files),
    stimulus_height = stim_height,
    maintain_aspect_ratio = TRUE,
    choices = c("Next"),
    post_trial_gap = 200
  )
  
  # trial structure
  interimB <- trial_image_button_response(
    stimulus = insert_resource(files$interimB_files),
    stimulus_height = stim_height,
    maintain_aspect_ratio = TRUE,
    choices = c("Next"),
    post_trial_gap = 200
  )
  
  
  # ----------- first test  -----------
  
  rating_scale <- c(
    "Definitely does not", rep("",8),
    "Definitely does"
  )
  
  # trial structure
  tests <- trial_image_slider_response(
    stimulus = insert_variable(name = "test_files"),
    data = insert_javascript(paste0("{test_item : ", insert_variable(name = "test_files"), "}")), # <- this shouldn't be needed, but there's a bug somewhere...
    stimulus_height = stim_height,
    maintain_aspect_ratio = TRUE,
    labels = rating_scale,
    slider_width = stim_width,
    require_movement = TRUE,
    min = 1,
    start = 5,
    max = 10,
    response_ends_trial = TRUE,
    prompt = "In your opinion, how likely is it that a sphere of this size has a plaxium coating? ",
    post_trial_gap = 200
  )
  
  # timeline
  test1_trials <- build_timeline(tests) %>%
    tl_add_variables(test_files = insert_resource(test_files)) %>%
    tl_add_parameters(randomize_order = TRUE)
  
  test2_trials <- build_timeline(tests) %>%
    tl_add_variables(test_files = insert_resource(test_files)) %>%
    tl_add_parameters(randomize_order = TRUE)
  
  test3_trials <- build_timeline(tests) %>%
    tl_add_variables(test_files = insert_resource(test_files)) %>%
    tl_add_parameters(randomize_order = TRUE)
  
  
  # ----------- final trial -----------
  finish <- trial_html_keyboard_response(
    stimulus = paste0("All done! Your HIT code is ",hit_code,".<BR>Thank you for participating in our experiment! Please press any key to end."),
    choices = respond_any_key()
  )
  
  complete_timeline <- build_timeline(
    instr, start_trials, train1_trials, interimA, 
    test1_trials, interimB, train2_trials ,interimA, 
    test2_trials, interimB, train3_trials, interimA, 
    test3_trials, finish
  )
  
  return(complete_timeline)
}


# create a welcome screen
welcome <- trial_html_keyboard_response(
  stimulus = "Welcome to the experiment! Press any key to begin", 
  choices = respond_any_key()
)

# create two timelines, one for each condition
category_timeline <- experiment_timeline("category")
property_timeline <- experiment_timeline("property")

# create a javascript functions that check the condition!
category_sampling <- fn_data_condition(condition_number == "1")
property_sampling <- fn_data_condition(condition_number == "2")

# make both timelines conditional...
category_timeline <- category_timeline %>% tl_display_if(category_sampling)
property_timeline <- property_timeline %>% tl_display_if(property_sampling)


# ------------ Dani fixes one of her foolish mistakes # ------------ 

# in theory there should be an analog of fn_sample here that immediately
# calls the jsPsych randomisation functions rather than returns a function
# to call them at callback time, but there is not, so here is the fix...
sample_one <- function(values) {
  insert_javascript(paste0(
    "jsPsych.randomization.sampleWithoutReplacement([", 
    paste0(values, collapse = ","), 
    "], 1)"
  ))
}

# ----------- build the experiment -----------
build_experiment(
  timeline = build_timeline(welcome, category_timeline, property_timeline),
  columns = insert_property(
    subj_id = sample_one(100:120),
    condition_number = sample_one(1:2)
  ),
  path = my_directory, 
  on_finish = fn_save_datastore(),
  #on_finish = fn_save_locally(),
  resources = build_resources(resource_folder)
)
