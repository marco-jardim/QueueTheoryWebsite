$(document).ready(function(){
    $('#instructions-btn').click(function(){
        $('#instructions').popover({
            title: 'Instructions', 
            html: true,
            content: 'You can read more here <i class="glyphicon glyphicon-arrow-right"></i>', 
            placement:'left',
            template: '<div class="popover popover-secondary"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
            delay: {show: 1000}
        });
        $('html, body').animate({
                scrollTop: $('#instructions').offset().top
            }, 1000, function(){
                $('#instructions').popover('show');
                $('#instructions').on('show.bs.popover',function(){
                    setTimeout(function(){
                        $('#instructions').popover('destroy');
                    },3000);
                });
        });
    });
    $('#calculate').click(function(){
        doCalculate();
        doCalculateProbabilities();
    });
    function doCalculate(){
        setter.All();
        // avoid Lambda and Mu having units and not the results by expresing the units of the results in Mu's
        if(Queuing.ResultsUnits === -1 && !(Queuing.LambdaUnits === -1 && Queuing.MuUnits === -1)){
            setResultsValues(Queuing.MuUnits);
        }else if(Queuing.LambdaUnits === -1 && Queuing.MuUnits === -1){
            setResultsValues(-1);
        }
        Queuing.calculate();
        QError.lookForCalculationErrors();
        
        if($.isEmptyObject(QError.messages)){
            $('#resultsPanel>.panel-heading').show();
            
            $('#LValue').text(0);
            $('#LValue').data('end', Stats.round(Queuing.L,Queuing.decimals));

            $('#LqValue').text(0);
            $('#LqValue').data('end', Stats.round(Queuing.Lq,Queuing.decimals));

            $('#WValue').text(0);
            $('#WValue').data('end', Stats.round(Queuing.W,Queuing.decimals));

            $('#WqValue').text(0);
            $('#WqValue').data('end', Stats.round(Queuing.Wq,Queuing.decimals));

            $('#RoValue').text(0);
            $('#RoValue').data('end', Stats.round(Queuing.Ro,Queuing.decimals));

            $('#LambdapValue').text('');
            $('#LambdapValue').data('end', 0);

            results_panel = $('#resultsPanel');
            Custom.expandPanel(results_panel);
            $('html, body').animate({
                scrollTop: results_panel.offset().top
            }, 1000, function(){
                Custom.runTileNumberAnimation();
            });
        }else{
            var messageKeys = Object.keys(QError.messages);
            if (messageKeys.length >= 1){
               alert(QError.messages[messageKeys[0]]);
            }
        }
        chart.discrete();
        chart.timeBased();
    }
    $('input[type=text]').change(function(){
        $(this).val(eval($(this).val()));
    });
    
    $('#LambdaConvert .LambdaUnits').click(function(){
        var convertToUnits = $(this);
        $('#Lambda').val(
            ConvertUnits.fromTo(
                parseFloat($('#Lambda').val()), 
                Queuing.LambdaUnits, 
                convertToUnits.data('units')
            )
        );
    });
    $('#MuConvert .MuUnits').click(function(){
        var convertToUnits = $(this);
        $('#Mu').val(
            ConvertUnits.fromTo(
                parseFloat($('#Mu').val()), 
                Queuing.MuUnits, 
                convertToUnits.data('units')
            )
        );
    });
    
    $('.LambdaUnits').click(function(){
        setLambdaValues($(this).data('units'));
    });
    setLambdaValues(($.jStorage.get('LambdaUnits')===null)?-1:$.jStorage.get('LambdaUnits'));
    function setLambdaValues(value){
        setter.LambdaUnits(value);
        var unitsTxt = units.getRateUnitsAbrev(Queuing.LambdaUnits);
        $('#LambdaUnitsSpan').html(unitsTxt + '&nbsp;&nbsp;<span class="caret"></span>');
        var unitsSmall = (Queuing.LambdaUnits === -1)? 'No Units': 'Arrivals / ' + units.getUnits(Queuing.LambdaUnits);
        $.jStorage.set('LambdaUnits', Queuing.LambdaUnits);
        $('#LambdaTitle>small').text(unitsSmall);
    }
    
    $('.MuUnits').click(function(){
        setMuValues($(this).data('units'));
    });
    setMuValues(($.jStorage.get('MuUnits')===null)?-1:$.jStorage.get('MuUnits'));
    function setMuValues(value){
        setter.MuUnits(value);
        var unitsTxt = units.getRateUnitsAbrev(Queuing.MuUnits);
        $('#MuUnitsSpan').html(unitsTxt + '&nbsp;&nbsp;<span class="caret"></span>');
        var unitsSmall = (Queuing.MuUnits === -1)? 'No Units': 'Services / ' + units.getUnits(Queuing.MuUnits);
        $.jStorage.set('MuUnits', Queuing.MuUnits);
        $('#muTitle>small').text(unitsSmall);
    }
    
    $('.ResultsUnits').click(function(){
        setResultsValues($(this).data('units'));
        doCalculate();
    });
    setResultsValues(($.jStorage.get('ResultsUnits')===null)?-1:$.jStorage.get('ResultsUnits'));
    function setResultsValues(value){
        setter.ResultsUnits(value);
        var unitsTxt = units.getRateUnitsAbrev(Queuing.ResultsUnits);
        $('#ResultsUnitsSpan').html(unitsTxt + '&nbsp;&nbsp;<span class="caret"></span>');
        var unitsSmall = (Queuing.ResultsUnits === -1)? '<small>No Units</small>': '<small class="h3">'+units.getRateUnitsAbrev(Queuing.ResultsUnits)+'</small>';
        $('#WValue').data('postfix', ' ' + '<small class="h3">'+units.getUnits(Queuing.ResultsUnits, true)+'</small>');
        $('#WqValue').data('postfix', ' ' + '<small class="h3">'+units.getUnits(Queuing.ResultsUnits, true)+'</small>');
        $.jStorage.set('ResultsUnits', Queuing.ResultsUnits);
        $('#tUnits').text(units.getUnits(Queuing.ResultsUnits, true));
        $('#tqUnits').text(units.getUnits(Queuing.ResultsUnits, true));
    }
    
    $('#t, #tq, #n').on('change', function(){
        doCalculateProbabilities();
    });
    $('#decimals').on('change', function(){
        setter.decimals($(this).val());
        doCalculate();
        doCalculateProbabilities();
    });
    function doCalculateProbabilities(){
        setter.Probabilities();
        Queuing.calculateProb();
        Queuing.calculateProbTime();
        $('#Pn').text(Stats.round(Queuing.Pn, Queuing.decimals));
        $('#T').text(Stats.round(Queuing.T, Queuing.decimals));
        $('#Tq').text(Stats.round(Queuing.Tq, Queuing.decimals));
    }
    $('.num').click(function(){
        $(this).children('input').focus(function() { $(this).select();});
        $(this).children('input').focus();
    });
    $('.tile-stats.pointer').click(function(){
        values_panel = $('#valuesPanel');
        values_panel.show();
        $('.tile-stats.pointer').removeClass('tile-orange');
        $(this).addClass('tile-orange');
        
        Custom.expandPanel(values_panel);

    
    });
    $('#MMC').click(function(){
        Queuing.model = 1;
        $('#c_tile').fadeIn('slow');
        $('#m_tile, #k_tile').fadeOut('slow');
    });
    $('#MMInf').click(function(){
        Queuing.model = 2;
        $('#c_tile, #m_tile, #k_tile').fadeOut('slow');
    });
    $('#MMCK').click(function(){
        Queuing.model = 3;
        $('#c_tile, #k_tile').fadeIn('slow');
        $('#m_tile').fadeOut('slow');
    });
    $('#MMC_M').click(function(){
        Queuing.model = 4;
        $('#c_tile, #m_tile').fadeIn('slow');
        $('#k_tile').fadeOut('slow');
    });

});