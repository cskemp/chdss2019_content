library(jaysire)

# ----------- setup -----------

# set directory (deletes any existing old experiment builds in it)
my_directory <- file.path("exp")
# create the empty folder if necessary
if(dir.exists(my_directory)) {
  unlink(my_directory, recursive = TRUE)
}

# randomly determine what condition people are in
condition <- sample(c("property","category"),1)

# set height and width of stimuli
stim_height <- 200
stim_width <- 350

# set subject ID which we'll also use as their completion code
# a random number between 10000 and 1000000
subj_id <- sample(x=10000:1000000,size=1)

# ----------- resource information -----------
resource_folder <- file.path("img")
instr_files <- list.files(resource_folder,pattern=paste0("robot[1-9]_",condition,"*"))
instr_success <- list.files(resource_folder,pattern=paste0("instructionsuccess_",condition,"*"))
start_files <- list.files(resource_folder,pattern=paste0("dataX[1-2]_",condition,"*"))
train1_files <- list.files(resource_folder,pattern=paste0("data[1-2]_",condition,"*"))
train2_files <- list.files(resource_folder,pattern=paste0("data[3-6]_",condition,"*"))
train3_files <- list.files(resource_folder,pattern=paste0("data[1-6]b_",condition,"*"))
interimA_files <- list.files(resource_folder,pattern=paste0("interimA_",condition,"*"))
interimB_files <- list.files(resource_folder,pattern=paste0("interimB_",condition,"*"))
test_files <- list.files(resource_folder,pattern="test[1-8].jpg")

# ----------- instructions -----------

# trial structure
instructions <- trial_image_button_response(
  stimulus = insert_variable(name = "instruction_files"),
  stimulus_height = stim_height*2,
  maintain_aspect_ratio = TRUE,
  #stimulus_width = stim_width,
  choices = c("Next"),
  post_trial_gap = 200
)

# timeline
instr_init <- build_timeline(instructions) %>%
  tl_add_variables(instruction_files = insert_resource(instr_files))

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

# this timeline only executes if the instruction checks were incorrectly
# answered. NOTE: because this timeline is not executed at all if the responses are correct, 
# it won't even register as a "trial" if the answers were correct. 
# What that means is that when jsPsych evaluates the "while"
# condition, it is as if this doesn't exist, and so the call to 
# fn_data_condition should still be referring to the "most recent trial"... 
instr_sorry <- trial_html_keyboard_response(
  stimulus = "Sorry, at least one of your responses was wrong. Press any key to see the instructions again.",
  choices = respond_any_key()
) %>%
  build_timeline() %>%
  tl_display_if(fn_data_condition(
    responses != '{"sizeQ":"They come in a variety of sizes","dataQ":"No, it only transmits some"}' 
  ))

# timeline, includes the conditionally-executed "sorry" screen
instr_trials <- build_timeline(instr_init, instr_qs, instr_sorry) %>%  
  tl_display_while(fn_data_condition(
    responses != '{"sizeQ":"They come in a variety of sizes","dataQ":"No, it only transmits some"}' # <- Dani: [fixes issue #4] omg this is such a pain. at the moment you have to test against the exact response string stored in the JSON. it's so dumb and i will fix it in a future version
  ))


# success screen when they make it through the instructions
instr_yay <- trial_html_keyboard_response(
  stimulus = "Well done! Press any key to start the experiment.",
  choices = respond_any_key()
)


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
  tl_add_variables(start_files = insert_resource(start_files))

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
  tl_add_variables(train1_files = insert_resource(train1_files))

# next four trials
train2 <- trial_image_button_response(
  stimulus = insert_variable(name = "train2_files"),
  stimulus_height = stim_height,
  maintain_aspect_ratio = TRUE,
  choices = c("Next"),
  post_trial_gap = 200
)

train2_trials <- build_timeline(train2) %>%
  tl_add_variables(train2_files = insert_resource(train2_files))

# last six trials
train3 <- trial_image_button_response(
  stimulus = insert_variable(name = "train3_files"),
  stimulus_height = stim_height,
  maintain_aspect_ratio = TRUE,
  choices = c("Next"),
  post_trial_gap = 200
)

train3_trials <- build_timeline(train3) %>%
  tl_add_variables(train3_files = insert_resource(train3_files))


# ----------- interim files  -----------

# trial structure
interimA <- trial_image_button_response(
  stimulus = insert_resource(interimA_files),
  stimulus_height = stim_height,
  maintain_aspect_ratio = TRUE,
  choices = c("Next"),
  post_trial_gap = 200
)

# trial structure
interimB <- trial_image_button_response(
  stimulus = insert_resource(interimB_files),
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
  data = insert_javascript(paste0("{test_item : ", insert_variable(name = "test_files"), "}")), # there is a bug somewhere, it should save this automatically. this is a workaround that inserts a new column called test_item
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
  stimulus = paste0("All done! Your HIT code is ", subj_id,".<BR>Thank you for participating in our experiment! Please press any key to end."),
  choices = respond_any_key()
)


# ----------- build the experiment -----------
build_experiment(
  timeline = build_timeline(instr_trials, instr_yay, start_trials,
                            train1_trials,interimA,test1_trials,
                            interimB,train2_trials,interimA,test2_trials,
                            interimB,train3_trials,interimA,test3_trials,
                            finish),
  columns = insert_property(subj_id = subj_id, condition = condition), 
  path = my_directory, 
  on_finish = fn_save_datastore(),
  resources = build_resources(resource_folder)
)
